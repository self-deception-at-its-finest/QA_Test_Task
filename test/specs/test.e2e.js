import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import FooterComponent from '../pageobjects/footer.component.js';


describe('Login functionality', () => {
    it('Valid Login', async () => {    //Test case №1
    
        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
    
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(InventoryPage.items).toBeDisplayed();

        await expect(InventoryPage.cartIcon).toBeDisplayed();
       
    });

    it('Login with invalid password', async () => {    //Test case №2
    
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


    it('Login with invalid Login', async () => {     //Test case №3
    
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

    it('Logout', async () => {    //Test case №4
    
        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');
        
        await InventoryPage.logout();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        await expect(LoginPage.inputUsername).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');
        
    }); 
});

describe('Cart functionality', () => {    
    it('Saving the cart after logout', async () => {    //Test case №5
    
        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');

        await InventoryPage.addRandomItemToCart();
        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText('1');

        await InventoryPage.logout();

        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');

        await expect(InventoryPage.items).toBeDisplayed();
        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText('1');

        await InventoryPage.cartIcon.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        //const itemNames = await CartPage.cartItemNames;
       // const namesTexts = await Promise.all(
       //     itemNames.map(async item => await item.getText())
       // );
       // await expect(namesTexts).toContain(addedProduct.name); ////?????
       
    });
});

describe('Products', () => {
    it('Sorting products', async () => {        //Test case №6
    
        
            
       
    });

});

describe('Footer', () => {
    it('Footer Links', async () => {        //Test case №7

        await LoginPage.open();
      
        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');

        await FooterComponent.goToTwitter();
        await FooterComponent.goToFacebook();
        await FooterComponent.goToLinkedin();
    });
});

describe('Checkout', () => {
    it('Valid checkout', async () => {        //Test case №8

    });

    it('Checkout witht products', async () => {        //Test case №9

    });

});
