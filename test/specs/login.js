import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';


describe('Login functionality', () => {
    it('Valid Login', async () => {    //Test case №1
    
        await loginPage.open();
      
        await loginPage.login('standard_user', 'secret_sauce'); 
    
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(inventoryPage.items).toBeDisplayed(); //cheking that items on inventory page are displayed

        await expect(inventoryPage.cartIcon).toBeDisplayed(); //cheking that cart on inventory page is displayed
       
    });

    it('Login with invalid password', async () => {    //Test case №2
    
        await loginPage.open();
      
        await loginPage.login('standard_user', 'not_a_secret_sauce'); 
    
        await expect(loginPage.errorMessage).toBeDisplayed(); //checking if error message appears
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service');

        const usernameClass = await loginPage.inputUsername.getAttribute('class'); 
        await expect(usernameClass).toContain('input_error form_input error');

        const passwordClass = await loginPage.inputPassword.getAttribute('class'); 
        await expect(passwordClass).toContain('input_error form_input error')

        const usernameBorderColor = await loginPage.inputUsername.getCSSProperty('border-bottom-color'); //cheking if username field is underlined with red
        await expect(usernameBorderColor.parsed.hex).toBe('#e2231a');

        const passwordBorderColor = await loginPage.inputPassword.getCSSProperty('border-bottom-color'); //cheking if password field is underlined with red
        await expect(passwordBorderColor.parsed.hex).toBe('#e2231a');

        await expect(loginPage.usernameErrorIcon).toBeDisplayed(); //checking if X icon appears in the username field
        await expect(loginPage.passwordErrorIcon).toBeDisplayed(); //checking if X icon appears in the password field
    });


    it('Login with invalid Login', async () => {     //Test case №3
    
        await loginPage.open();
      
        await loginPage.login('not_a_standard_user', 'secret_sauce'); 
    
        await expect(loginPage.errorMessage).toBeDisplayed(); 
        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service');

        const usernameClass = await loginPage.inputUsername.getAttribute('class');
        await expect(usernameClass).toContain('input_error form_input error');

        const passwordClass = await loginPage.inputPassword.getAttribute('class');
        await expect(passwordClass).toContain('input_error form_input error')

        const usernameBorderColor = await loginPage.inputUsername.getCSSProperty('border-bottom-color');
        await expect(usernameBorderColor.parsed.hex).toBe('#e2231a');

        const passwordBorderColor = await loginPage.inputPassword.getCSSProperty('border-bottom-color');
        await expect(passwordBorderColor.parsed.hex).toBe('#e2231a');

        await expect(loginPage.usernameErrorIcon).toBeDisplayed();
        await expect(loginPage.passwordErrorIcon).toBeDisplayed();
    });

});