import { Given, When, Then, After, Before, DataTable, setDefaultTimeout } from '@cucumber/cucumber';
import { test, expect, chromium } from '@playwright/test';
import { after } from 'node:test';
// import { loginPage } from '../../PageObject/Login.js'; 
setDefaultTimeout(60 * 1000);
let browser, page;

Before(async function () {
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
    await expect(await page.getByRole('link', { name: 'Hello admin!' })).toBeVisible();

});
Then(`User Validates the Invalid Credentials error message`, async () => {
    await expect(page.getByText('Invalid login attempt.')).toBeVisible();
});

When(`User Navigate to Employee Details page`, async () => {
    await page.getByRole('link', { name: 'Employee Details' }).click();
});

Then(`User Validates the employee details {string},{string} and {string}`, async (empName, empSalary, empGrade) => {

    await page.getByRole('link', { name: 'Employee Details' }).click();
    await expect(await page.getByRole('cell', { name: 'John', exact: true }).textContent()).toContain(empName);
    await expect(await page.getByRole('cell', { name: '2500' }).textContent()).toContain(empSalary);
    await expect(await page.getByRole('row', { name: 'John 2500 3 EmployeePF |' }).getByRole('cell').nth(2).textContent()).toContain(empGrade);
    await console.log("******* Success *******");
});

After(async function () {
    await browser.close();
});