class InventoryPage {
    get items()  { return $('[data-test="inventory-list"]'); }
    get cartIcon()  { return $('[data-test="shopping-cart-link"]'); }
    get btnBurger() { return $('#react-burger-menu-btn'); }
    get menuList() { return $('.bm-menu-wrap'); }
    get menuItems() { return $$('.bm-item.menu-item'); }
    get logoutSidebarBtn() { return $('[data-test="logout-sidebar-link"]'); }
    get addToCartButtons() { return $$('.btn_inventory'); } 
    get productNames() { return $$('.inventory_item_name'); }
    get productPrices() { return $$('.inventory_item_price'); }
    get productDescriptions () { return $('.inventory_item_desc'); }
    get cartBadge () { return $('[data-test="shopping-cart-badge"]'); }

    async logout() {
      await this.btnBurger.click();
      await expect(this.menuList).toBeDisplayed();
      const items = await this.menuItems;
      await expect(items).toBeElementsArrayOfSize(4);
      await this.logoutSidebarBtn.click();
    }

    async addRandomItemToCart() {
        const buttons = await this.addToCartButtons;
        const names = await this.productNames;
        const prices = await this.productPrices;
        const descriptions = await this.productDescriptions;

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
        return addedProduct; // Возвращаем объект с информацией
    }
}

module.exports = new InventoryPage();