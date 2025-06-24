import { Given, When, Then, After, Before, DataTable,setDefaultTimeout } from '@cucumber/cucumber';
import { test, expect, chromium } from '@playwright/test';
import { after } from 'node:test';
// import { loginPage } from '../../PageObject/Login.js'; 
setDefaultTimeout(60 * 1000);
let browser, page;

Before(async function() {
     browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given(`User launch the EAApp application URL`, async function () {
    await page.goto('http://eaapp.somee.com/');
    await expect(page.locator("h4")).toBeVisible();
});

Then(`User login with valid {string} and {string}`, async function (UserName, password) {
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'UserName' }).fill(UserName);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    // await expect(page.getByRole('link', { name: 'Log off' })).toBeVisible();
});
Then(`User Validates the Invalid Credentials error message`, async () =>{   
  await expect(page.getByText('Invalid login attempt.')).toBeVisible();
});

After(async function () {
    await browser.close();
});