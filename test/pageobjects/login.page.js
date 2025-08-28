class LoginPage {
    get inputUsername() { return $('[data-test="username"]'); }
    get inputPassword() { return $('[data-test="password"]'); }
    get btnLogin() { return $('[data-test="login-button"]'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }
}

module.exports = new LoginPage();
