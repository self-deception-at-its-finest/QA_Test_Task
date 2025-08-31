import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import FooterComponent from '../pageobjects/footer.component.js';
import cartPage from '../pageobjects/cart.page.js';
import CheckoutStepOne from '../pageobjects/checkout.step.one.js';
import CheckoutStepTwo from '../pageobjects/checkout.step.two.js';
import CheckoutComplete from '../pageobjects/checkout.complete.js';


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

        const addedItem = await InventoryPage.addRandomItemToCart();
        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText(addedItem.expectedCartCount.toString());

        await InventoryPage.logout();

        await LoginPage.loginWithCredentials('standard_user', 'secret_sauce');

        await expect(InventoryPage.items).toBeDisplayed();
        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText(addedItem.expectedCartCount.toString());

        await InventoryPage.cartIcon.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        const itemNames = await CartPage.cartItemNames;
        const namesTexts = [];
        for (const item of itemNames) {
            const text = await item.getText();
            namesTexts.push(text);
        }
        await expect(namesTexts).toContain(addedItem.name); 
       
    });
});


describe('Products', () => {   //Test case №6

    beforeEach(async () => {

        await InventoryPage.open();
    });

    it('Sorting products by Price (low to high)', async () => {        
    
        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'lohi');

        const prices = await InventoryPage.getAllItemPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        
        await expect(prices).toEqual(sortedPrices);           
    });

    it('Sorting productsy Price (high to low)', async () => {      

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'hilo');

        const prices = await InventoryPage.getAllItemPrices();
        const sortedPrices = [...prices].sort((a, b) => b- a);
        
        await expect(prices).toEqual(sortedPrices); 

    });

    it('Sorting products by Name (A to Z)', async () => {    

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'az');
        
        const names = await InventoryPage.getAllItemNames();
        const sortedNames = [...names].sort();
        
        await expect(names).toEqual(sortedNames);
    });
    
    it('Sorting products by Name (Z to A) ', async () => {       

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'za');
        
        const names = await InventoryPage.getAllItemNames();
        const sortedNames = [...names].sort().reverse();
        
        await expect(names).toEqual(sortedNames);
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

        await InventoryPage.open();

        await expect(InventoryPage.items).toBeDisplayed();
        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await expect(InventoryPage.cartBadge).toBeDisplayed();
        
        await CartPage.clearCart();
        await InventoryPage.open();
        const addedItem = await InventoryPage.addRandomItemToCart();
        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText(addedItem.expectedCartCount.toString());

        await InventoryPage.cartIcon.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        const itemNames = await CartPage.cartItemNames;
        const namesTexts = [];
        for (const item of itemNames) {
            const text = await item.getText();
            namesTexts.push(text);
        }
        await expect(namesTexts).toContain(addedItem.name); 

        await cartPage.checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')

        await expect(CheckoutStepOne.checkoutInfoContainer).toBeDisplayed();

        await CheckoutStepOne.fillCheckoutForm('secret_users_firsname',"secret_users_lastname", "60456");

        await CheckoutStepOne.continueBtn.click();
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-step-two.html");

        const checkoutItems = await CheckoutStepTwo.getItemNames();
        await expect(checkoutItems).toContain(addedItem.name);

        const expectedPrice = parseFloat(addedItem.price.replace('$', ''));
        const actualSubtotal = await CheckoutStepTwo.getSubtotal();
        await expect(actualSubtotal).toBeCloseTo(expectedPrice, 2);

        await CheckoutStepTwo.finishButton.click(); 
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-complete.html");

        await expect(CheckoutComplete.checkoutCompleteContainer).toBeDisplayed();
        await expect(CheckoutComplete.completeHeader).toBeDisplayed();
        await expect(CheckoutComplete.completeHeader).toHaveText("Thank you for your order!");
        
        await CheckoutComplete.backToProductsBtn.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(InventoryPage.items).toBeDisplayed();

        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await expect(InventoryPage.isCartEmpty()).toBeTruthy();

    });

    it('Checkout without products', async () => {        //Test case №9

        await InventoryPage.open();

        await expect(InventoryPage.items).toBeDisplayed();
        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await InventoryPage.cartIcon.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        
        await cartPage.clearCart();

        await cartPage.checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    
        await cartPage.emptyCartMessage.isDisplayed();
    
        const messageText =  await this.emptyCartMessage.getText();
        await expect(messageText).toContain('cart is empty');
    });

});
