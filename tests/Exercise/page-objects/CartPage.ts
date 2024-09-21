import { Page, Locator, expect } from '@playwright/test';

class CartPage {
  private page : Page;
  private cartItems : Locator;
  private checkoutButton : Locator;

  constructor(page : Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
  }

  async verifyCartItemsNumber(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async verifyProductIsDisplayed(productName: string) {
  const productLocator = this.page.locator(`.inventory_item_name:has-text("${productName}")`);
  const isVisible = await productLocator.isVisible();
  expect(isVisible).toBeTruthy(); 
  }

  async navigateToCheckout() {
    await this.checkoutButton.click();
  }

}
export { CartPage };