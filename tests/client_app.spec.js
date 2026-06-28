
import { test, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';

test('LoginPage practice test2', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const login = page.locator("#login");
    const productTitle = page.locator(".card-body b");

    await userEmail.fill("infosabbir9@gmail.com");
    await userPassword.fill("2@Ahammed.#");
    await login.click();

    // const firstTitle = await productTitle.first().textContent();
    // console.log("FirstProductTitle: ", firstTitle);

    await page.waitForLoadState('networkidle');
    // or
    // await productTitle.first().waitFor();
    const allTitle = await productTitle.allTextContents();
    console.log("All Product title: ", allTitle);


});