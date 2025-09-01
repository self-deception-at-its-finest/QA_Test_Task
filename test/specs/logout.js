import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';


describe('Login functionality', () => {
    it('Logout', async () => {    //Test case №4
    
        await loginPage.open();
      
        await loginPage.login('standard_user', 'secret_sauce');
        
        await inventoryPage.logout(); // logout with burger menu

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        await expect(loginPage.inputUsername).toHaveValue(''); //checking if username and password fields are empty after logout
        await expect(loginPage.inputPassword).toHaveValue('');
        
    }); 
});