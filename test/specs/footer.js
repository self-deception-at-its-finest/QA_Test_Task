import loginPage from '../pageobjects/login.page.js';
import footerComponent from '../pageobjects/footer.component.js';
import { CREDENTIALS } from '../constants/creds.constants.js';

describe('Footer', () => {
    it('Footer Links', async () => {        //Test case №7

        await loginPage.open();
      
        await loginPage.login(CREDENTIALS.VALID.STANDARD_USER.username, CREDENTIALS.VALID.STANDARD_USER.password); 

        await footerComponent.goToSocialMedia(footerComponent.footerIconTwitter, 'https://x.com/saucelabs', 'Twitter'); 
        await footerComponent.goToSocialMedia(footerComponent.footerIconFacebook, 'https://www.facebook.com/saucelabs', 'Facebook'); 
        await footerComponent.goToSocialMedia(footerComponent.footerIconLinkedin, 'https://www.linkedin.com/company/sauce-labs/', 'LinkedIn'); 
    });
});