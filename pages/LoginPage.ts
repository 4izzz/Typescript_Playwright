import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  public readonly usernameFieldLocator: string = '#user-name';
  public readonly passwordFieldLocator: string = '#password';
  public readonly loginButtonLocator: string = '#login-button';
  public readonly errorMessageContainerLocator: string = '.error-message-container'

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameFieldLocator, username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordFieldLocator, password);
  }

  async clickLogin(): Promise<void> {
    await this.page.click(this.loginButtonLocator);
  }

  async getErrorMessage(): Promise<string> {
    const text: string | null = await this.page.locator(this.errorMessageContainerLocator).textContent();
    if (text === null) {
      throw new Error('Error message not found!');
    }
    return text;
  }
}
