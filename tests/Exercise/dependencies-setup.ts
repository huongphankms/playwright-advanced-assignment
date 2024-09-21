import { Browser, chromium, expect, Page, test } from "@playwright/test";
import { LoginPage } from "./page-objects/LoginPage";

test("Dependencies setup", async ({ }) => {
  console.log("Performing dependencies setup....");
const browser: Browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext();
  const page: Page = await context.newPage();
  const loginPageUrl = "https://www.saucedemo.com";
  const userName = "standard_user";
  const password = "secret_sauce";
  const authPath = "./auth.json";
  
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage(loginPageUrl);
  await loginPage.validLogin(userName, password);
  await loginPage.storageAuth(context, authPath);
  await loginPage.closeBrowser(browser);

})
