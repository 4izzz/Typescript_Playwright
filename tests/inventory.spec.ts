import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { globalState } from '../utils/globalState';
import path from 'path';
import fs from 'fs';

const contextsDir = path.resolve(__dirname, '../contexts');

// Load users from the JSON file
const { usersFilePath } = globalState;
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

test.describe('Inventory Page Tests', () => {
  for (const { username } of users) {
    test(`Validate that click on "Add to cart" button changes the button to "Remove" for ${username}`, async ({ browser }) => {
      const storageStatePath = path.join(contextsDir, `${username}.json`);
      // Use the saved storage state
      const context = await browser.newContext({ storageState: storageStatePath });
      const page = await context.newPage();

      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      // Open inventory page
      await loginPage.navigateTo(inventoryPage.rootUrl);
      
      // Get count of all items visible
      const inventoryItems = page.locator(`${inventoryPage.inventoryListLocator} ${inventoryPage.inventoryItemLocator}`);
      const itemCount = await inventoryItems.count();
      
      // Click for every "Add to cart" button and check that it becomes "Remove" button
      for (let i = 0; i < itemCount; i++) {
        const addToCartButton = inventoryItems.nth(i).locator(inventoryPage.addToCartButtonLocator);
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();
        const removeButton = inventoryItems.nth(i).locator(inventoryPage.removeButtonLocator);
        await expect(removeButton).toBeVisible();
      }

      await context.close();
  });
  }
});
