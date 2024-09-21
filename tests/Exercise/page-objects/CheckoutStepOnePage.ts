import { Page, Locator } from '@playwright/test';

class CheckoutStepOnePage {
  private page : Page;
  private continueButton : Locator;
  private firstName : Locator;
  private lastName : Locator;
  private postalCode : Locator;
    
  constructor(page : Page) {
    this.page = page;
    this.continueButton = page.locator("#continue");
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.postalCode = page.locator("#postal-code");
  }

  async addInformation(firstName: string, lastName: string, postalCode: string) {
    if (!firstName || !lastName || !postalCode) {
        throw new Error("First Name, Last Name, and Postal Code are required.");
    }
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToCheckoutTwoPage() {
    await this.continueButton.click();
  }
}

export { CheckoutStepOnePage };


