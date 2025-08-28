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

    it('Login with invalid password', async () => {
    
        await LoginPage.open();
      
        await LoginPage.inputUsername.setValue('standard_user');
       
        await expect(LoginPage.inputUsername).toHaveValue('standard_user');
        
        await LoginPage.inputPassword.setValue('not_a_secret_sauce');
        
        const typeAttr = await LoginPage.inputPassword.getAttribute('type');
        await expect(typeAttr).toEqual('password');

        await LoginPage.btnLogin.click();
    
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service');

        const usernameClass = await LoginPage.inputUsername.getAttribute('class');
        await expect(usernameClass).toContain('input_error form_input error');

        const passwordClass = await LoginPage.inputPassword.getAttribute('class');
        await expect(passwordClass).toContain('input_error form_input error')

        const usernameBorderColor = await LoginPage.inputUsername.getCSSProperty('border-bottom-color');
        await expect(usernameBorderColor.parsed.hex).toBe('#e2231a');

        const passwordBorderColor = await LoginPage.inputPassword.getCSSProperty('border-bottom-color');
        await expect(passwordBorderColor.parsed.hex).toBe('#e2231a');

        await expect(LoginPage.usernameErrorIcon).toBeDisplayed();
        await expect(LoginPage.passwordErrorIcon).toBeDisplayed();
    });
});