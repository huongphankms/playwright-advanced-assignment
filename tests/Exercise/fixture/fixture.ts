import {test as base} from "@playwright/test";
import { LoginPage } from '../page-objects/LoginPage';
import { InventoryPage } from '../page-objects/InventoryPage';
import { CartPage } from "../page-objects/CartPage";
import { CheckoutStepOnePage } from "../page-objects/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../page-objects/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../page-objects/CheckoutCompletePage";

export const test = base.extend<{
  loginPage : LoginPage; 
  inventorydPage : InventoryPage; 
  cartPage : CartPage;
  checkoutStepOnePage : CheckoutStepOnePage;
  checkoutStepTwoPage : CheckoutStepTwoPage;
  checkoutCompletePage : CheckoutCompletePage
}> ({
  // Define the Fixtures
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page));
  },
  
  inventorydPage: async ({page}, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({page}, use) => {
    await use(new CartPage(page));
  },

  checkoutStepOnePage: async ({page}, use) => {
    await use(new CheckoutStepOnePage(page));
  },

  checkoutStepTwoPage: async ({page}, use) => {
    await use(new CheckoutStepTwoPage(page));
  },

  checkoutCompletePage: async ({page}, use) => {
    await use(new CheckoutCompletePage(page));
  }
})
