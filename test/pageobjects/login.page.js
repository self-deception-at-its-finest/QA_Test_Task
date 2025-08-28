class LoginPage {
    get inputUsername() { return $('[data-test="username"]'); }
    get inputPassword() { return $('[data-test="password"]'); }
    get btnLogin() { return $('[data-test="login-button"]'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get usernameErrorIcon() { return $('input#user-name ~ svg.error_icon'); }
    get passwordErrorIcon() { return $('input#password ~ svg.error_icon'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }
}

module.exports = new LoginPage();
