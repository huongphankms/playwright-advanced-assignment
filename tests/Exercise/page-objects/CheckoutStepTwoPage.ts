import { Page, Locator, expect } from '@playwright/test';

class CheckoutStepTwoPage {
  private page : Page;
  private finishButton : Locator;
  private productQuantities  : Locator;
  private productPrices : Locator;
  private itemTotal : Locator;
  private tax : Locator;
  private total : Locator

  constructor(page : Page) {
    this.page = page;
    this.finishButton = page.locator("#finish");
    this.productQuantities = page.locator(".cart_quantity");
    this.productPrices = page.locator(".inventory_item_price");
    this.itemTotal = page.locator(".summary_subtotal_label");
    this.tax = page.locator(".summary_tax_label");
    this.total = page.locator(".summary_total_label");
  }

   async caculateProductPrices(): Promise<number[]> {
    const pricesText = await this.productPrices.allTextContents();
    const quantitiesText = await this.productQuantities.allTextContents();
    const prices = pricesText.map(price => parseFloat(price.replace("$", "")));
    const quantities = quantitiesText.map(quantity => parseInt(quantity));
    return prices.map((price, index) => price * quantities[index]);
  }

  async getDisplayedValue(locator: Locator): Promise<number> {
  const textContent = await locator.textContent();
  const numericValue = textContent!.match(/[\d,.]+/);
  return parseFloat(numericValue![0].replace(',', ''));
  }

  async verifyTotalPrice() {
    const prices = await this.caculateProductPrices();
    const priceTotal = prices.reduce((acc, price) => acc + price, 0);
    const expectedTax = priceTotal * 0.08;
    const expectedTotal = priceTotal + expectedTax;
    const displayedItemTotal = await this.getDisplayedValue(this.itemTotal);
    const displayedTax = await this.getDisplayedValue(this.tax);
    const displayedTotal = await this.getDisplayedValue(this.total);
    expect(displayedItemTotal).toEqual(priceTotal);
    expect(displayedTax).toBeCloseTo(expectedTax, 2); 
    expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
  }

  async navigateToFinish() {
    await this.finishButton.click();
  }
}

export { CheckoutStepTwoPage };


