import LoginPage from '../pageobjects/login.page.js';
import footerComponent from '../pageobjects/footer.component.js';

describe('Footer', () => {
    it('Footer Links', async () => {        //Test case №7

        await LoginPage.open();
      
        await LoginPage.login('standard_user', 'secret_sauce'); 

        await footerComponent.goToTwitter(); 
        await footerComponent.goToFacebook();
        await footerComponent.goToLinkedin();
    });
});