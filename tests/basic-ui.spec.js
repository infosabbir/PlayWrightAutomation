
import { test, expect } from '@playwright/test';
import { text } from 'node:stream/consumers';

test('LoginPage Practise test1', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // return resource

    const userName = page.locator("#username");
    const passWord = page.locator("#password");
    const radioButton = page.locator(".radiotextsty");
    const modalOkaybtn = page.locator("#okayBtn");
    const terms = page.locator("#terms");
    const signButton = page.locator("#signInBtn");
    const errorMessge = page.locator("#login-form .alert-danger");
    const cardTitle = page.locator(".card-body a")

    // 1.verify page title
    const title = await page.title();
    // print pageTitle on console
    console.log('Page title:', title);
    // use assertion to check to have page title?
    await expect(page).toHaveTitle(title);

    // 2. Senario A: Try wrong login info first
    await userName.fill("wrong-username");
    await passWord.fill("wrong-password");
    await radioButton.filter({ hasText: "Admin" }).click();

    await terms.check();
    await signButton.click();

    // 3. Validate the Error message
    await expect(errorMessge).toBeVisible();
    await expect(errorMessge).toContainText("Incorrect username/password.");

    // Print clean text to console
    const cleanErrorText = await errorMessge.textContent();
    console.log("Capture Error text: ", cleanErrorText.trim());

    // 4. Senario B: Try corrent login info next.
    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");
    await radioButton.filter({ hasText: "User" }).click();

    // Handle the modal popup that appears when choosing 'User'
    await modalOkaybtn.waitFor({ state: 'visible' });
    await modalOkaybtn.click();

    await terms.check();
    await signButton.click();

    // const firstTitle = await cardTitle.first().textContent();
    // console.log("Card first element Title: ", firstTitle);

    // await cardTitle.first().waitFor({ state: 'visible' });

    // const allTitle = await cardTitle.allTextContents();
    // console.log("Card of All Title: ", allTitle);

    await expect(cardTitle).toHaveText(['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry']);

});

test.only('LoginPage practice test2', async ({ page }) => {
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

    await productTitle.first().waitFor({ state: 'visible' });
    const allTitle = await productTitle.allTextContents();
    console.log("All Product title: ", allTitle);


});