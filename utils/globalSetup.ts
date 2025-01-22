import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { globalState } from './globalState';
import fs from 'fs';
import path from 'path';

// Path to the users JSON file
const { usersFilePath, contextsDir } = globalState;

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use!;
  const browser = await chromium.launch();

  // Load users from the JSON file
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  // Populate global state with baseURL
  globalState.baseURL = baseURL!;

  // Ensure the contexts directory exists
  if (!fs.existsSync(contextsDir)) {
    fs.mkdirSync(contextsDir);
  }

  // Save a browser context for each user
  for (const { username, password } of users) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    // Log in as the user
    await loginPage.navigateTo(baseURL!);
    await loginPage.login(username, password);

    // Verify login was successful
    const isLoggedIn = await page.url().includes('inventory.html');
    if (!isLoggedIn) {
      console.warn(`Login failed for user: ${username}`);
    }

    // Save the storage state for this user
    const storageStatePath = path.join(contextsDir, `${username}.json`);
    await context.storageState({ path: storageStatePath });

    await context.close();
  }

  await browser.close();
}

export default globalSetup;
