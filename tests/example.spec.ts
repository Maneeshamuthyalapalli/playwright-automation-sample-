import { test, expect } from '@playwright/test';

test('Microsoft Teams Login', async ({ page }) => {
  // Navigate to Teams login page
  await page.goto('https://teams.microsoft.com/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Enter email/username
  const emailInput = page.locator('input[type="email"]');
  await emailInput.fill('your-email@example.com');
  
  // Click Next button
  const nextButton = page.locator('button:has-text("Next")');
  await nextButton.click();

  // Wait for password field to appear
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });

  // Enter password
  const passwordInput = page.locator('input[type="password"]');
  await passwordInput.fill('your-password');

  // Click Sign in button
  const signInButton = page.locator('button:has-text("Sign in")');
  await signInButton.click();

  // Wait for Teams home page to load
  await page.waitForLoadState('networkidle');

  // Verify successful login - check if Teams dashboard is visible
  await expect(page).toHaveURL(/teams\.microsoft\.com/);
  
  console.log('✅ Teams login successful!');
});
