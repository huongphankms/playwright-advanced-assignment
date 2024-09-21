import { Page, Locator } from '@playwright/test';

class InventoryPage {
  private page : Page;
  private products : Locator;
  private cartButton : Locator;

  constructor(page : Page) {
    this.page = page;
    this.products = page.locator(".inventory_item");
    this.cartButton = page.locator(".shopping_cart_link");
  }

   async searchProductAddCart(productName : string) {
    await this.page.waitForLoadState('networkidle');
    const productElement = this.products.filter({ hasText : productName });
    const addToCartButton = productElement.locator('button:has-text("Add to cart")');
    if (await addToCartButton.count() === 0) {
      throw new Error(`Product "${productName}" not found or already added to cart.`);
    }
    await addToCartButton.click();
  }

  async navigateToCart() {
    await this.cartButton.click();
  }

  async goToInventoryPage(url: string) {
    await this.page.goto(url);
  }
}

export { InventoryPage };


