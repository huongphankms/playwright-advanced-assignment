import { Page, Locator, expect, Browser, BrowserContext } from '@playwright/test';

export class LoginPage {

  private page : Page;
  private loginButton : Locator;
  private userName : Locator;
  private password : Locator;
  private pageHeading : Locator;
    
  constructor(page : Page) {
    this.page = page;
    this.loginButton = page.locator("#login-button");
    this.userName = page.locator("#user-name");
    this.password = page.locator("#password");
    this.pageHeading = page.locator('[data-test="secondary-header"]');
  }

  async goToLoginPage(loginPageUrl: string) {
    await this.page.goto(loginPageUrl);
  }

  async validLogin(userName: string, password: string) {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.pageHeading).toContainText('Products');
  }

  async storageAuth(context: BrowserContext, pathString: string) {
    await this.page.waitForLoadState('networkidle');
    await context.storageState({ path: pathString });
  }

  async closeBrowser(browser: Browser) {
    await browser.close();
  }
}

module.exports = { LoginPage };
