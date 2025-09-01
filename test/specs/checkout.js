import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutStepOne from '../pageobjects/checkout.step.one.js';
import checkoutStepTwo from '../pageobjects/checkout.step.two.js';
import checkoutComplete from '../pageobjects/checkout.complete.js';
import loginPage from '../pageobjects/login.page.js';

describe('Checkout', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
     });

    it('Valid checkout', async () => {        //Test case №8

        await expect(inventoryPage.items).toBeDisplayed();  // cheking if inventory page elements are displayed
        await expect(inventoryPage.cartIcon).toBeDisplayed();  // cheking if inventory page cart is displayed
        
        await cartPage.clearCart(); // clearing cart from previous tests
        
        await inventoryPage.open();

        const addedItem = await inventoryPage.addRandomItemToCart();  // adding a random item and saving it information in 'addedItem'
        await expect(inventoryPage.cartBadge).toBeDisplayed();   // cheking if cart badge with number of added to cart itesm is displayed
        await expect(inventoryPage.cartBadge).toHaveText(addedItem.expectedCartCount.toString());   // checking if number on card badge is coorect and matches amount of addedItems

        await inventoryPage.cartIcon.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        const itemNames = await cartPage.cartItemNames; // get all cart item name elements, returns an array of WebElement objects
        const namesTexts = [];
        for (const item of itemNames) {
            const text = await item.getText();
            namesTexts.push(text); // get text from items elements
        }
        await expect(namesTexts).toContain(addedItem.name); //cheking if cart page contains previuosly added item

        await cartPage.checkoutBtn.click(); // going to checkout
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')

        await expect(checkoutStepOne.checkoutInfoContainer).toBeDisplayed(); //checkin if the checkout form is displayed

        await checkoutStepOne.fillCheckoutForm('secret_users_firsname',"secret_users_lastname", "60456"); // filling in the checkout form with valid data

        await checkoutStepOne.continueBtn.click(); // going to the final checkout step
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-step-two.html");

        const checkoutItems = await checkoutStepTwo.getItemNames(); // get all the checkout items
        await expect(checkoutItems).toContain(addedItem.name); // checking if the final checkout contains previously added item

        const expectedPrice = parseFloat(addedItem.price.replace('$', '')); // calculating expected price and verify it matches subtotal
        const actualSubtotal = await checkoutStepTwo.getSubtotal();
        await expect(actualSubtotal).toBeCloseTo(expectedPrice, 2);

        await checkoutStepTwo.finishButton.click(); // finisching the checkout
        await expect(browser).toHaveUrl("https://www.saucedemo.com/checkout-complete.html");

        await expect(checkoutComplete.checkoutCompleteContainer).toBeDisplayed(); // cheking if the complete message is displayed
        await expect(checkoutComplete.completeHeader).toBeDisplayed();
        await expect(checkoutComplete.completeHeader).toHaveText("Thank you for your order!");
        
        await checkoutComplete.backToProductsBtn.click(); // going back to items page

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(inventoryPage.items).toBeDisplayed();

        await expect(inventoryPage.cartIcon).toBeDisplayed();

        await expect(inventoryPage.isCartEmpty()).toBeTruthy(); // checking if the cart is empty after checkout

    });

    it('Checkout without products', async () => {        //Test case №9

        await expect(inventoryPage.items).toBeDisplayed();
        await expect(inventoryPage.cartIcon).toBeDisplayed();

        await inventoryPage.cartIcon.click(); // goig ot cart page
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        
        await cartPage.clearCart(); // clearing the cart if its not empty

        await cartPage.checkoutBtn.click(); // going to checkout
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html'); //checking if the url is still cart page, and we are not redirected
    
        await cartPage.emptyCartMessage.isDisplayed(); //cheking if the error message  is displayed
    
        const messageText =  await this.emptyCartMessage.getText();
        await expect(messageText).toContain('cart is empty'); // cheking the correct text on the error message
    });

});