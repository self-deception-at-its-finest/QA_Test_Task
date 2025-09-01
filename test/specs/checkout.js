import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import cartPage from '../pageobjects/cart.page.js';
import CheckoutStepOne from '../pageobjects/checkout.step.one.js';
import CheckoutStepTwo from '../pageobjects/checkout.step.two.js';
import CheckoutComplete from '../pageobjects/checkout.complete.js';
import LoginPage from '../pageobjects/login.page.js';

describe('Checkout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
     });

    it('Valid checkout', async () => {        //Test case №8

        await expect(InventoryPage.items).toBeDisplayed();  // cheking if inventory page elements are displayed
        await expect(InventoryPage.cartIcon).toBeDisplayed();  // cheking if inventory page cart is displayed
        
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