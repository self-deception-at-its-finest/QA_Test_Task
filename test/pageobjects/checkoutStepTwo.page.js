class CheckoutStepTwo {
    get cartItems() { return $$('[data-test="inventory-item"]'); }
    get itemNames() { return $$('[data-test="inventory-item-name"]'); }
    get itemPrices() { return $$('[data-test="inventory-item-price"]'); }
    get subtotalLabel() { return $('[data-test="subtotal-label"]'); }
    get taxLabel() { return $('[data-test="tax-label"]'); }
    get totalLabel() { return $('[data-test="total-label"]'); }
    get finishButton() { return $('[data-test="finish"]'); }
    get cancelButton() { return $('[data-test="cancel"]'); }


    async getItemNames() {
        const names = [];
        const nameElements = await this.itemNames;
        for (const element of nameElements) {
            names.push(await element.getText());
        }
        return names;
    }
    
    async getItemPrices() {
        const prices = [];
        const priceElements = await this.itemPrices;
        for (const element of priceElements) {
            const priceText = await element.getText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }
        return prices;
    }

    async getSubtotal() {
        const subtotalText = await this.subtotalLabel.getText();
        return parseFloat(subtotalText.replace('Item total: $', ''));
    }
    
    async getTotal() {
        const totalText = await this.totalLabel.getText();
        return parseFloat(totalText.replace('Total: $', ''));
    }

}
export default new CheckoutStepTwo();