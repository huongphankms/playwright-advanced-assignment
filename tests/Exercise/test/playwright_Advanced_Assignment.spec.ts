import { test } from '../fixture/fixture';
import { productNameMapping } from "../utils/map";
const dataset = JSON.parse(JSON.stringify(require("../data/placeOrderTestDataMapping.json")));

test.describe('@exercise @smoke @regression', () => {
  for (const data of dataset) {
    test(`Test case: User login and order two products ${data.product1} and ${data.product2}`, async({
    inventorydPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
    }) => {
    const inventoryPageUrl = "https://www.saucedemo.com/inventory.html";
    const productName1 = <string>productNameMapping.get(data.product1);
    const productName2 = <string>productNameMapping.get(data.product2);
    const orderSucessfullyMessage = "Thank you for your order!";
      
    await inventorydPage.goToInventoryPage(inventoryPageUrl);
    await inventorydPage.searchProductAddCart(productName1);
    await inventorydPage.searchProductAddCart(productName2);
    await inventorydPage.navigateToCart();

    await cartPage.verifyCartItemsNumber(data.numberOfProducts);
    await cartPage.verifyProductIsDisplayed(productName1);
    await cartPage.verifyProductIsDisplayed(productName2);
    await cartPage.navigateToCheckout();

    await checkoutStepOnePage.addInformation(data.firstName, data.lastName, data.postalCode);
    await checkoutStepOnePage.navigateToCheckoutTwoPage();

    await checkoutStepTwoPage.verifyTotalPrice();
    await checkoutStepTwoPage.navigateToFinish();

    await checkoutCompletePage.verifySucessfulMessageDisplayed(orderSucessfullyMessage);

  })
  }
})
