class FooterComponent {
    get footerIconTwitter () { return $('[data-test="social-twitter"]'); }
    get footerIconFacebook () { return $('[data-test="social-facebook"]'); }
    get footerIconLinkedin () { return $('[data-test="social-linkedin"]'); }

    async goToTwitter() {
        await this.footerIconTwitter.click();

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl('https://x.com/saucelabs');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    }

    async goToFacebook() {
        await this.footerIconFacebook.click();

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl('https://www.facebook.com/saucelabs');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    }

    async goToLinkedin() {
        await this.footerIconLinkedin.click();

        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await expect(browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/');

        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    }

}

export default new FooterComponent();