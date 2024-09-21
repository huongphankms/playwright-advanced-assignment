import { Page, Locator, expect } from '@playwright/test';

class CheckoutCompletePage {
  private backHomeButton: Locator;
  private messageComplete: Locator;
    
  constructor(page: Page) {
    this.backHomeButton = page.locator("#back-to-products");
    this.messageComplete = page.locator(".complete-header");
  }

  async verifySucessfulMessageDisplayed(message: string) {
    await expect(this.messageComplete).toBeVisible();
    await expect(this.messageComplete).toHaveText(message);
  }

  async navigateToBackHome() {
    await this.backHomeButton.click();
  }

}

export { CheckoutCompletePage };


