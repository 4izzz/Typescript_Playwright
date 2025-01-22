import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { globalState } from '../utils/globalState';
import fs from 'fs';

// Load users from the JSON file
const { usersFilePath, baseURL } = globalState;
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

test.describe('Login performace Tests', () => {
  for (const { username, password } of users) {
    test(`Validate login time for ${username}`, async ({ browser }) => {
      
      // Use the saved storage state
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginPage = new LoginPage(page);

      // Log in as the user
      await loginPage.navigateTo(baseURL);
      await loginPage.fillUsername(username);
      await loginPage.fillPassword(password);
      
      // Measure time for the login
      const startTime = Date.now();
      await loginPage.clickLogin();
      const endTime = Date.now();
      const clickDuration = endTime - startTime;

      // Assert that the click time is within the acceptable range
      if (clickDuration > 1000) {
        throw new Error(
          `Login click for ${username} took ${clickDuration}ms, exceeding the 1-second threshold.`
        );
      }

      // Perform any test-specific validations
      await expect(page).toHaveURL(/inventory.html/);

      await context.close();
    });
  }
});
