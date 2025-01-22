# Playwright UI Automation Framework

This project is a UI automation framework built using [Playwright](https://playwright.dev/) and TypeScript. It uses the **Page Object Model (POM)** for better maintainability and scalability, and is designed to test the functionality of [SauceDemo](https://www.saucedemo.com/).

## Features
- Page Object Model (POM) design pattern
- Data-driven testing with multiple user credentials
- Performance monitoring
- Reusable browser contexts for faster test execution
- Configurable via Playwright's configuration file

---

## Project Structure

```plaintext
.
├── data/
│   ├── users.json          # JSON file containing user credentials
├── pages/
│   ├── BasePage.ts         # Base class with shared methods for all pages
│   ├── InventoryPage.ts    # Page object for inventory page functionality
│   ├── LoginPage.ts        # Page object for login functionality
├── tests/
│   ├── inventory.spec.ts   # Test cases for inventory page
│   ├── login.spec.ts       # Test cases for login functionality
├── utils/
│   ├── globalSetup.ts      # Global setup for preparing browser contexts
│   ├── globalState.ts      # Shared state for users and baseURL
├── contexts/
│   ├── *.json              # Storage states for each user
├── package.json            # Node.js dependencies and scripts
├── playwright.config.ts    # Configuration file for Playwright
├── README.md               # Documentation for the project
```
---

## Prerequisites

Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [Git](https://git-scm.com/)

---

## Setup Instructions

1. **Clone the Repository**:
   git clone <repository-url>
   cd <repository-directory>

2. **Install Dependencies**:
    npm install

3. **Run Tests: Execute all tests using the following command:**
    npx playwright test

4. **View Test Results: After running tests, view the results in the terminal. For a detailed report, use the Playwright HTML reporter:**
    npx playwright show-report