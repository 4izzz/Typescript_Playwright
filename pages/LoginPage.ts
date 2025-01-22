import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  public usernameFieldLocator: string = '#user-name';
  public passwordFieldLocator: string = '#password';
  public loginButtonLocator: string = '#login-button';
  public errorMessageContainerLocator: string = '.error-message-container'

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async fillUsername(username: string) {
    await this.page.fill(this.usernameFieldLocator, username);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordFieldLocator, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButtonLocator);
  }

  async getErrorMessage(): Promise<string> {
    const text = await this.page.locator(this.errorMessageContainerLocator).textContent();
    if (text === null) {
      throw new Error('Error message not found!');
    }
    return text;
  }
}
