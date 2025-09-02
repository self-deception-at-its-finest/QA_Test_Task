class LoginPage {
    get inputUsername() { return $('[data-test="username"]'); }
    get inputPassword() { return $('[data-test="password"]'); }
    get btnLogin() { return $('[data-test="login-button"]'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get usernameErrorIcon() { return $('input#user-name ~ svg.error_icon'); }
    get passwordErrorIcon() { return $('input#password ~ svg.error_icon'); }

    async open() {
        await browser.url('/');
        await this.waitForPageLoad();
    }
    
    async waitForPageLoad() {
        await $('#root').waitForExist({ timeout: 10000 });
    }
    
   async login(username, password) { 
        await this.inputUsername.setValue(username);
        await expect(this.inputUsername).toHaveValue(username);

        await this.inputPassword.setValue(password);
        await expect(this.inputPassword).toHaveAttribute('type', 'password');

        await this.btnLogin.click();
    }
}

export default new LoginPage();