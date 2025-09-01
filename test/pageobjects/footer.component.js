class FooterComponent {
    get footerIconTwitter () { return $('[data-test="social-twitter"]'); }
    get footerIconFacebook () { return $('[data-test="social-facebook"]'); }
    get footerIconLinkedin () { return $('[data-test="social-linkedin"]'); }


    async goToSocialMedia(iconElement, expectedUrl, socialName) {
        await iconElement.click();
        
        await browser.waitUntil(async () => {                     // opening social media tab
            const handles = await browser.getWindowHandles(); 
            return handles.length > 1;
        }, { 
            timeout: 5000, 
            timeoutMsg: `${socialName} tab did not open` 
        });
        
        const handles = await browser.getWindowHandles(); // switch to the new tab
        await browser.switchToWindow(handles[1]);
        
        await expect(browser).toHaveUrl(expectedUrl);      // checking if the social media tab URL is correct
        
        await browser.closeWindow();               // closing tab and returning to the previous
        await browser.switchToWindow(handles[0]);
        
        return true;
    }
}
export default new FooterComponent();