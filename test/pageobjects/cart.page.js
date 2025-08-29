class CartPage {
    get cartItems() { return $$('.cart_item'); }
    get cartItemNames() { return $$('[data-test="inventory-item-name"]'); }
    get cartItemPrices() { return $$('.inventory_item_price'); }

    async verifyCartItemsCount(expectedCount) {
        const items = await this.cartItems;
        await expect(items).toBeElementsArrayOfSize(expectedCount);
    }
}