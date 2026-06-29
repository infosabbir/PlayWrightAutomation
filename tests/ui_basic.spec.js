
const { test, expect } = require('@playwright/test');


test('Senario:1 When incorrent credential loginPage', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const passWord = page.locator("#password");

    const adminRadioButton = page.locator('span:has-text("Admin")');

    const dropDown = page.locator('select.form-control');

    const terms = page.locator('#terms:visible');
    const signInBtn = page.locator('#signInBtn');
    const errorMessge = page.locator(".alert.alert-danger.col-md-12");

    // Senario: 1 when incorrent credential
    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning");

    await adminRadioButton.click();
    await expect(adminRadioButton).toBeChecked();


    await dropDown.selectOption("Consultant");
    await expect(dropDown).toContainText("Consultant");

    await terms.check();
    await expect(terms).toBeChecked();

    await terms.uncheck();
    await expect(terms).not.toBeChecked();

    await signInBtn.click();

    await expect(errorMessge).toBeVisible();

    const errorMessgeText = await errorMessge.textContent();
    console.log("Wrong Credential message: ", errorMessgeText);

    await expect(errorMessge).toContainText(errorMessgeText);
});

test('Senario:2 When corrent credential loginPge', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const passWord = page.locator("#password");

    const userRadioButton = page.locator('span:has-text("User")');
    const dropDown = page.locator('select.form-control');

    const terms = page.locator('#terms:visible');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    // Senario 2: when correct credential
    await userName.fill("rahulshettyacademy");
    await passWord.fill("Learning@830$3mK2");

    await userRadioButton.click();
    await expect(userRadioButton).toBeChecked();

    await page.locator('#okayBtn').click();

    await dropDown.selectOption("Teacher");
    await expect(dropDown).toContainText("Teacher");

    await terms.check();
    await expect(terms).toBeChecked();

    await terms.uncheck();
    await expect(terms).not.toBeChecked();

    await signInBtn.click();

    await cardTitles.first().waitFor();
    await expect(cardTitles.first()).toContainText("iphone X");

    const allCardTitles = await cardTitles.allTextContents();
    console.log("All card title: ", allCardTitles);

});
