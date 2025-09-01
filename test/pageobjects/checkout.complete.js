import checkoutStepOne from "./checkout.step.one";

class CheckoutComplete {
    get checkoutCompleteContainer()  { return $('[data-test="checkout-complete-container"]'); }
    get completeHeader()  { return $('[data-test="complete-header"]'); }
    get backToProductsBtn()  { return $('[data-test="back-to-products"]'); }

}
export default new CheckoutComplete();