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
      
        await LoginPage.login('standard_user', 'secret_sauce'); 
    
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(InventoryPage.items).toBeDisplayed(); //cheking that items on inventory page are displayed

        await expect(InventoryPage.cartIcon).toBeDisplayed(); //cheking that cart on inventory page is displayed
       
    });

    it('Login with invalid password', async () => {    //Test case №2
    
        await LoginPage.open();
      
        await LoginPage.login('standard_user', 'not_a_secret_sauce'); 
    
        await expect(LoginPage.errorMessage).toBeDisplayed(); //checking if error message appears
        await expect(LoginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service');

        const usernameClass = await LoginPage.inputUsername.getAttribute('class'); 
        await expect(usernameClass).toContain('input_error form_input error');

        const passwordClass = await LoginPage.inputPassword.getAttribute('class'); 
        await expect(passwordClass).toContain('input_error form_input error')

        const usernameBorderColor = await LoginPage.inputUsername.getCSSProperty('border-bottom-color'); //cheking if username field is underlined with red
        await expect(usernameBorderColor.parsed.hex).toBe('#e2231a');

        const passwordBorderColor = await LoginPage.inputPassword.getCSSProperty('border-bottom-color'); //cheking if password field is underlined with red
        await expect(passwordBorderColor.parsed.hex).toBe('#e2231a');

        await expect(LoginPage.usernameErrorIcon).toBeDisplayed(); //checking if X icon appears in the username field
        await expect(LoginPage.passwordErrorIcon).toBeDisplayed(); //checking if X icon appears in the password field
    });


    it('Login with invalid Login', async () => {     //Test case №3
    
        await LoginPage.open();
      
        await LoginPage.login('not_a_standard_user', 'secret_sauce'); 
    
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
      
        await LoginPage.login('standard_user', 'secret_sauce');
        
        await InventoryPage.logout(); // logout with burger menu

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        await expect(LoginPage.inputUsername).toHaveValue(''); //checking if username and password fields are empty after logout
        await expect(LoginPage.inputPassword).toHaveValue('');
        
    }); 
});


describe('Cart functionality', () => {    
    it('Saving the cart after logout', async () => {    //Test case №5
    
        await LoginPage.open();
      
        await LoginPage.login('standard_user', 'secret_sauce'); 

        const addedItem = await InventoryPage.addRandomItemToCart(); //adding a random item and saving it information in 'addedItem'
        await expect(InventoryPage.cartBadge).toBeDisplayed(); //cheking if cart badge with number of added to cart itesm is displayed
        await expect(InventoryPage.cartBadge).toHaveText(addedItem.expectedCartCount.toString()); //checking if number on card badge is coorect and matches amount of addedItems

        await InventoryPage.logout(); // logout with burger menu

        await LoginPage.login('standard_user', 'secret_sauce'); 

        await expect(InventoryPage.items).toBeDisplayed();
        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await expect(InventoryPage.cartBadge).toBeDisplayed();
        await expect(InventoryPage.cartBadge).toHaveText(addedItem.expectedCartCount.toString());//cheking if cart number on card badge is coorect
                                                                                                 // and matches amount of addedItems AFTER logout
        await InventoryPage.cartIcon.click(); // going to cart page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        const itemNames = await CartPage.cartItemNames; // get all cart item name elements, returns an array of WebElement objects
        const namesTexts = [];
        for (const item of itemNames) {
            const text = await item.getText();  
            namesTexts.push(text); // saving the extracted texts in namesTexts array
        }
        await expect(namesTexts).toContain(addedItem.name); // cheking if that the array of item names contains the name of the item added before
       
    });
});


describe('Products', () => {   //Test case №6

    beforeEach(async () => {

        await InventoryPage.open(); // going to invetory page before each test
    });

    it('Sorting products by Price (low to high)', async () => {        
    
        await InventoryPage.sortDropdown.click(); // Click on the sorting dropdown to open it
        await InventoryPage.sortDropdown.selectByAttribute('value', 'lohi'); //selecting the sorting option for price low to high 'lohi'


        const prices = await InventoryPage.getAllItemPrices(); // get all current product prices after sorting, getAllItemPrices() returns an array of numbers (prices)
        const sortedPrices = [...prices].sort((a, b) => a - b); // creating a sorted copy([...prices]) of the prices array for comparison
                                                                // sort((a, b) => a - b) sorts numbers in ascending order
        await expect(prices).toEqual(sortedPrices);  // cheking if actual prices match the expected sorted prices         
    });

    it('Sorting productsy Price (high to low)', async () => {      

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'hilo');// selecting the sorting option for price hight to low 'hilo'

        const prices = await InventoryPage.getAllItemPrices();
        const sortedPrices = [...prices].sort((a, b) => b- a); // sort((a, b) => b - a) sorts numbers in descending order
        
        await expect(prices).toEqual(sortedPrices); 

    });

    it('Sorting products by Name (A to Z)', async () => {    

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'az'); // selecting the sorting option for names A to Z in alphabet order 'az'
        
        const names = await InventoryPage.getAllItemNames();
        const sortedNames = [...names].sort(); // sort() sorts names in alphabet order 
        
        await expect(names).toEqual(sortedNames);
    });
    
    it('Sorting products by Name (Z to A) ', async () => {       

        await InventoryPage.sortDropdown.click();
        await InventoryPage.sortDropdown.selectByAttribute('value', 'za'); // selecting the sorting option for names A to Z in reversed alphabet order 'za'
        
        const names = await InventoryPage.getAllItemNames();
        const sortedNames = [...names].sort().reverse(); // sort().reverse() sorts names in reversed alphabet order 
        
        await expect(names).toEqual(sortedNames);
    });
});


describe('Footer', () => {
    it('Footer Links', async () => {        //Test case №7

        await LoginPage.open();
      
        await LoginPage.login('standard_user', 'secret_sauce'); // another valid login

        await FooterComponent.goToTwitter(); 
        await FooterComponent.goToFacebook();
        await FooterComponent.goToLinkedin();
    });
});

describe('Checkout', () => {
    it('Valid checkout', async () => {        //Test case №8

        await InventoryPage.open();

        await expect(InventoryPage.items).toBeDisplayed();  // cheking if inventory page elements are displayed
        await expect(InventoryPage.cartIcon).toBeDisplayed();  // cheking if inventory page cart is displayed

        await expect(InventoryPage.cartBadge).toBeDisplayed();
        
        await CartPage.clearCart(); // clearing cart from previous tests
        await InventoryPage.open();
        const addedItem = await InventoryPage.addRandomItemToCart();  // adding a random item and saving it information in 'addedItem'
        await expect(InventoryPage.cartBadge).toBeDisplayed();   // cheking if cart badge with number of added to cart itesm is displayed
        await expect(InventoryPage.cartBadge).toHaveText(addedItem.expectedCartCount.toString());   // checking if number on card badge is coorect and matches amount of addedItems

        await InventoryPage.cartIcon.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        const itemNames = await CartPage.cartItemNames; // get all cart item name elements, returns an array of WebElement objects
        const namesTexts = [];
        for (const item of itemNames) {
            const text = await item.getText();
            namesTexts.push(text); // get text from items elements
        }
        await expect(namesTexts).toContain(addedItem.name); //cheking if cart page contains previuosly added item

        await cartPage.checkoutBtn.click(); // going to checkout
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')

        await expect(CheckoutStepOne.checkoutInfoContainer).toBeDisplayed(); //checkin if the checkout form is displayed

        await CheckoutStepOne.fillCheckoutForm('secret_users_firsname',"secret_users_lastname", "60456"); // filling in the checkout form with valid data

        await CheckoutStepOne.continueBtn.click(); // going to the final checkout step
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-step-two.html");

        const checkoutItems = await CheckoutStepTwo.getItemNames(); // get all the checkout items
        await expect(checkoutItems).toContain(addedItem.name); // checking if the final checkout contains previously added item

        const expectedPrice = parseFloat(addedItem.price.replace('$', '')); // calculating expected price and verify it matches subtotal
        const actualSubtotal = await CheckoutStepTwo.getSubtotal();
        await expect(actualSubtotal).toBeCloseTo(expectedPrice, 2);

        await CheckoutStepTwo.finishButton.click(); // finisching the checkout
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-complete.html");

        await expect(CheckoutComplete.checkoutCompleteContainer).toBeDisplayed(); // cheking if the complete message is displayed
        await expect(CheckoutComplete.completeHeader).toBeDisplayed();
        await expect(CheckoutComplete.completeHeader).toHaveText("Thank you for your order!");
        
        await CheckoutComplete.backToProductsBtn.click(); // going back to items page

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(InventoryPage.items).toBeDisplayed();

        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await expect(InventoryPage.isCartEmpty()).toBeTruthy(); // checking if the cart is empty after checkout

    });

    it('Checkout without products', async () => {        //Test case №9

        await InventoryPage.open();

        await expect(InventoryPage.items).toBeDisplayed();
        await expect(InventoryPage.cartIcon).toBeDisplayed();

        await InventoryPage.cartIcon.click(); // goig ot cart page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        
        await cartPage.clearCart(); // clearing the cart if its not empty

        await cartPage.checkoutBtn.click(); // going to checkout
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html'); //checking if the url is still cart page, and we are not redirected
    
        await cartPage.emptyCartMessage.isDisplayed(); //cheking if the error message  is displayed
    
        const messageText =  await this.emptyCartMessage.getText();
        await expect(messageText).toContain('cart is empty'); // cheking the correct text on the error message
    });

});
