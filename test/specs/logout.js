import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';


describe('Login functionality', () => {
    it('Logout', async () => {    //Test case №4
    
        await LoginPage.open();
      
        await LoginPage.login('standard_user', 'secret_sauce');
        
        await InventoryPage.logout(); // logout with burger menu

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        await expect(LoginPage.inputUsername).toHaveValue(''); //checking if username and password fields are empty after logout
        await expect(LoginPage.inputPassword).toHaveValue('');
        
    }); 
});