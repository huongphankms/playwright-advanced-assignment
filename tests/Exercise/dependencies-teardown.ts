import { test } from "@playwright/test";

test("Clean up", async ({ page, context }) => {
  console.log("Perform clear up steps......for test case");
  await page.context().clearCookies();

    await page.waitForLoadState('load');
  await page.evaluate(() => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  });
 
  await page.evaluate(() => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn('Failed to clear sessionStorage:', error);
    }
  });

  await context.storageState({ path: 'auth.json' });
  console.log('Cleared cookies and saved updated state to auth.json');
});
 