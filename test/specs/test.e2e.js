import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';


describe('Login functionality', () => {
    it('Valid Login', async () => {
    
        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
    
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(InventoryPage.items).toBeDisplayed();

        await expect(InventoryPage.cartIcon).toBeDisplayed();
       
    });

    it('Login with invalid password', async () => {
    
        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('standard_user', 'not_a_secret_sauce');
    
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


    it('Login with invalid Login', async () => {
    
        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('not_a_standard_user', 'secret_sauce');
    
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

    it('Logout', async () => {
    
        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
        
        await inventoryPage.btnBurger.click();
        await expect(inventoryPage.menuList).toBeDisplayed();

        const items = await inventoryPage.menuItems;
        await expect(items).toBeElementsArrayOfSize(4);

        await inventoryPage.logoutSidebarBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
        await expect(LoginPage.inputUsername).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');
        
    });
});