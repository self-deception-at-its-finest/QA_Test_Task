import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';


describe('Login functionality', () => {
    it('Valid Login', async () => {
    
        await LoginPage.open();
      
        await LoginPage.inputUsername.setValue('standard_user');
       
        await expect(LoginPage.inputUsername).toHaveValue('standard_user');
        
        await LoginPage.inputPassword.setValue('secret_sauce');
        
        const typeAttr = await LoginPage.inputPassword.getAttribute('type');
        await expect(typeAttr).toEqual('password');

        await LoginPage.btnLogin.click();
    
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(InventoryPage.items).toBeDisplayed();

        await expect(InventoryPage.cartIcon).toBeDisplayed();
       
    });
});