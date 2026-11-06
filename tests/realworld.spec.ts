import { test, expect } from '@playwright/test';

test('Login to realworld app', async ({ page }, testInfo) => {
	await page.goto('https://demo.realworld.show/');
	const screenshot = await page.screenshot({
        path: 'evidencias/login.png',
        fullPage: true
    });
    await testInfo.attach('Login Page', {
        body: screenshot,
        contentType: 'image/png'
    });
	await expect(page).toHaveTitle('Conduit');
	await page.getByRole('link', { name: 'Sign in' }).click();
	await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
	await page.getByPlaceholder('email').fill('david3505@hotmail.com');
	await page.getByPlaceholder('password').fill('Panecillo123');
	await page.getByRole('button', { name: 'Sign in' }).click();
	await expect(page.locator("//li//a[contains(text(),'Your Feed')]")).toBeVisible();
	
	const username = await page.locator("//a[contains(@href,'/profile/')]").textContent();
	
	await expect(username).toContain('alejomon');
});