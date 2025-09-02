import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { CREDENTIALS } from '../constants/creds.constants.js';
import { URLS } from '../constants/urls.constants.js';


describe('Logout', () => {
    it('Logout', async () => {    //Test case №4
    
        await loginPage.open();
      
        await loginPage.login(CREDENTIALS.VALID.STANDARD_USER.username, CREDENTIALS.VALID.STANDARD_USER.password);
        
        await inventoryPage.logout(); // logout with burger menu

        await expect(browser).toHaveUrl(expect.stringContaining(URLS.BASE));

        await expect(loginPage.inputUsername).toHaveValue(''); //checking if username and password fields are empty after logout
        await expect(loginPage.inputPassword).toHaveValue('');
        
    }); 
});