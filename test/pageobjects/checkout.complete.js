class CheckoutComplete {
    get checkoutCompleteContainer()  { return $('[data-test="checkout-complete-container"]'); }
    get completeHeader()  { return $('[data-test="complete-header"]'); }
    get backToProductsBtn()  { return $('[data-test="back-to-products"]'); }

}
module.exports = new CheckoutComplete();