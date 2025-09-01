class CheckoutStepOne {
    get checkoutInfoContainer() { return $('[data-test="checkout-info-container"]'); }
    get inputFirstname() { return $('[data-test="firstName"]'); }
    get inputLastname() { return $('[data-test="lastName"]'); }
    get inputPostalcode() { return $('[data-test="postalCode"]'); }
    get continueBtn() { return $('[data-test="continue"]'); }

    async fillCheckoutForm(firstname, lastname, postalcode) {

        await this.inputFirstname.setValue(firstname);
        await expect(this.inputFirstname).toHaveValue(firstname);

        await this.inputLastname.setValue(lastname);
        await expect(this.inputLastname).toHaveValue(lastname);

        await this.inputPostalcode.setValue(postalcode);
        await expect(this.inputPostalcode).toHaveValue(postalcode);

    }
}
export default new CheckoutStepOne();