import { URLS } from '../constants/urls.constants.js';


class InventoryPage {
    get items()  { return $('[data-test="inventory-list"]'); }
    get cartIcon()  { return $('[data-test="shopping-cart-link"]'); }
    get btnBurger() { return $('#react-burger-menu-btn'); }
    get menuList() { return $('.bm-menu-wrap'); }
    get menuItems() { return $$('.bm-item.menu-item'); }
    get logoutSidebarBtn() { return $('[data-test="logout-sidebar-link"]'); }
    get addToCartButtons() { return $$('.btn_inventory'); } 
    get itemNames() { return $$('.inventory_item_name'); }
    get itemPrices() { return $$('.inventory_item_price'); }
    get itemDescriptions () { return $$('.inventory_item_desc'); }
    get cartBadge () { return $('[data-test="shopping-cart-badge"]'); }
    get sortDropdown() { return $('[data-test="product-sort-container"]'); }
     
    
    async logout() {
        await expect(browser).toHaveUrl(expect.stringContaining(URLS.INVENTORY));
        await expect(this.items).toBeDisplayed();
        await expect(this.cartIcon).toBeDisplayed();

        await this.btnBurger.waitForDisplayed({ timeout: 5000 });
        await this.btnBurger.click();

        await this.menuList.waitForDisplayed({ timeout: 10000 });
        await expect(this.menuList).toBeDisplayed();
        await expect(this.menuItems).toBeElementsArrayOfSize(4);

        await this.logoutSidebarBtn.click();
    }

    async open() {
        await browser.url(URLS.INVENTORY);
    }

    async addRandomItemToCart() {                     
        const buttons = await this.addToCartButtons;  // get all add to cart buttons, product names, prices, and descriptions
        const names = await this.itemNames;
        const prices = await this.itemPrices;
        const descriptions = await this.itemDescriptions;

        const randomIndex = Math.floor(Math.random() * buttons.length); // generating a random index within the range of available products
    
        let initialCartCount = 0; // initializing variables to track cart state
        let isCartBadgeVisible = false;
    
        try {  // try to get current cart count from the badge
            isCartBadgeVisible = await this.cartBadge.isDisplayed(); // checking if cart badge is currently displayed
            if (isCartBadgeVisible) {
                initialCartCount = parseInt(await this.cartBadge.getText()); // parsing the current cart count from badge text
            }
        } catch (error) {
            console.log('Cart badge not found or not visible, starting from 0'); // starting from 0 when cart badge is not found or not visible
            initialCartCount = 0;
            isCartBadgeVisible = false;
        }

        const addedProduct = {                        // creating product object with all relevant information
            index: randomIndex,                       // randomly selected index
            name: await names[randomIndex].getText(),
            price: await prices[randomIndex].getText(),
            description: await descriptions[randomIndex].getText(),
            id: await names[randomIndex].getAttribute('id'),
            dataTest: await buttons[randomIndex].getAttribute('data-test'),
            expectedCartCount: initialCartCount + 1,    // expected cart count after adding
            hadCartBadge: isCartBadgeVisible
        };

        await buttons[randomIndex].click(); // clicking the 'add to cart' button for the randomly selected product
        return addedProduct;  // rturning the product information object for next verification
    }

    async isCartEmpty() {
         return !(await this.cartBadge.isDisplayed())
    }

    async getAllItemNames() {     // method for getting all the item names, returns an 'namesTexts' array
        const names = await this.itemNames;
        const namesTexts = [];
    
        for (let i = 0; i < names.length; i++) {
            const text = await names[i].getText();
            namesTexts.push(text);
    }
    
    return namesTexts;
    }

     async getAllItemPrices() {      // method for getting all the item prices, returns an 'prices' aaray
        const priceElements = await $$('.inventory_item_price');
        const prices = [];
        
    
        for (let i = 0; i < priceElements.length; i++) {
            const priceText = await priceElements[i].getText();
            const priceValue = parseFloat(priceText.replace('$', ''));
            prices.push(priceValue);
        }
        
        return prices;
    }
}

export default new InventoryPage();