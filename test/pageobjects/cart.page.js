class CartPage {
    get cartItems() { return $$('.cart_item'); }
    get cartItemNames() { return $$('[data-test="inventory-item-name"]'); }
    get cartItemPrices() { return $$('.inventory_item_price'); }
    get removeButtons() { return $$('.cart_item .btn_secondary'); }
    get continueShoppingBtn() { return $('#continue-shopping'); }
    get checkoutBtn() { return $('[data-test="checkout"]'); }
    get emptyCartMessage() { return $('//*[contains(text(), "cart is empty")]'); }

    async verifyCartItemsCount(expectedCount) {
        const items = await this.cartItems;
        await expect(items).toBeElementsArrayOfSize(expectedCount);
    }

    async clearCart() { // method for clearing cart
        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes('/cart.html')) {
            await browser.url('https://www.saucedemo.com/cart.html');
        }

        const removeBtns = await this.removeButtons;

        if (removeBtns.length > 0) {
            for (let i = removeBtns.length - 1; i >= 0; i--) {
                await removeBtns[i].click();
                await browser.pause(300); 
            } 
         } 
    }
}

export default new CartPage();
