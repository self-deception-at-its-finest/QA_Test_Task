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
      await this.btnBurger.click();
      await expect(this.menuList).toBeDisplayed();
      const items = await this.menuItems;
      await expect(items).toBeElementsArrayOfSize(4);
      await this.logoutSidebarBtn.click();
    }

    async open() {
        await browser.url('https://www.saucedemo.com/inventory.html');
    }

    async addRandomItemToCart() {
        const buttons = await this.addToCartButtons;
        const names = await this.itemNames;
        const prices = await this.itemPrices;
        const descriptions = await this.itemDescriptions;

        const randomIndex = Math.floor(Math.random() * buttons.length);
        
        const addedProduct = {
            index: randomIndex,
            name: await names[randomIndex].getText(),
            price: await prices[randomIndex].getText(),
            description: await descriptions[randomIndex].getText(),
            id: await names[randomIndex].getAttribute('id'),
            dataTest: await buttons[randomIndex].getAttribute('data-test')
        };

        await buttons[randomIndex].click();
        return addedProduct;
    }

    async getAllItemNames() {
        const names = await this.itemNames;
        const namesTexts = [];
    
        for (let i = 0; i < names.length; i++) {
            const text = await names[i].getText();
            namesTexts.push(text);
    }
    
    return namesTexts;
}

     async getAllItemPrices() {
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

module.exports = new InventoryPage();