import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';


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