import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutStepOne from '../pageobjects/checkoutStepOne.page.js';
import checkoutStepTwo from '../pageobjects/checkoutStepTwo.page.js';
import checkoutComplete from '../pageobjects/checkoutComplete.page.js';
import loginPage from '../pageobjects/login.page.js';
import { CREDENTIALS } from '../constants/creds.constants.js';
import { URLS } from '../constants/urls.constants.js';
import { CHECKOUT_DATA} from '../constants/checkout.constants.js';

describe('Checkout', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login(CREDENTIALS.VALID.STANDARD_USER.username, CREDENTIALS.VALID.STANDARD_USER.password);
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
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));

        const itemNames = await cartPage.cartItemNames; // get all cart item name elements, returns an array of WebElement objects
        const namesTexts = [];
        for (const item of itemNames) {
            const text = await item.getText();
            namesTexts.push(text); // get text from items elements
        }
        await expect(namesTexts).toContain(addedItem.name); //cheking if cart page contains previuosly added item

        await cartPage.checkoutBtn.click(); // going to checkout
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_STEP_ONE))

        await expect(checkoutStepOne.checkoutInfoContainer).toBeDisplayed(); //checkin if the checkout form is displayed

        await checkoutStepOne.fillCheckoutForm(CHECKOUT_DATA.VALID.RAYAN_GOSLING.firstName,CHECKOUT_DATA.VALID.RAYAN_GOSLING.lastName, CHECKOUT_DATA.VALID.RAYAN_GOSLING.zipCode ); // filling in the checkout form with valid data

        await checkoutStepOne.continueBtn.click(); // going to the final checkout step
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_STEP_TWO));

        const checkoutItems = await checkoutStepTwo.getItemNames(); // get all the checkout items
        await expect(checkoutItems).toContain(addedItem.name); // checking if the final checkout contains previously added item

        const expectedPrice = parseFloat(addedItem.price.replace('$', '')); // calculating expected price and verify it matches subtotal
        const actualSubtotal = await checkoutStepTwo.getSubtotal();
        await expect(actualSubtotal).toBeCloseTo(expectedPrice, 2);

        await checkoutStepTwo.finishButton.click(); // finisching the checkout
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CHECKOUT_COMPLETE));

        await expect(checkoutComplete.checkoutCompleteContainer).toBeDisplayed(); // cheking if the complete message is displayed
        await expect(checkoutComplete.completeHeader).toBeDisplayed();
        await expect(checkoutComplete.completeHeader).toHaveText("Thank you for your order!");
        
        await checkoutComplete.backToProductsBtn.click(); // going back to items page

        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));

        await expect(inventoryPage.items).toBeDisplayed();

        await expect(inventoryPage.cartIcon).toBeDisplayed();

        await expect(inventoryPage.isCartEmpty()).toBeTruthy(); // checking if the cart is empty after checkout

    });

    it('Checkout without products', async () => {        //Test case №9

        await expect(inventoryPage.items).toBeDisplayed();
        await expect(inventoryPage.cartIcon).toBeDisplayed();

        await inventoryPage.cartIcon.click(); // goig ot cart page
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART));
        
        await cartPage.clearCart(); // clearing the cart if its not empty

        await cartPage.checkoutBtn.click(); // going to checkout
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.CART)); //checking if the url is still cart page, and we are not redirected
    
        await cartPage.emptyCartMessage.isDisplayed(); //cheking if the error message  is displayed
    
        const messageText =  await this.emptyCartMessage.getText();
        await expect(messageText).toContain('cart is empty'); // cheking the correct text on the error message
    });

});