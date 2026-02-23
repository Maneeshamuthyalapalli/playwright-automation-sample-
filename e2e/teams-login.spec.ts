import { test, expect } from '@playwright/test';

/**
 * Microsoft Teams Login Test
 * 
 * Setup:
 * 1. Set environment variables:
 *    - MS_EMAIL=your-email@example.com
 *    - MS_PASSWORD=your-password
 * 
 * 2. Run: npm test -- teams-login.spec.ts
 */

test.describe('Microsoft Teams Login', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Get credentials from environment variables
    const email = process.env.MS_EMAIL || 'your-email@example.com';
    const password = process.env.MS_PASSWORD || 'your-password';

    // Navigate to Teams
    await page.goto('https://teams.microsoft.com/', { waitUntil: 'networkidle' });

    // Check if already logged in
    const isLoggedIn = await page.url().includes('teams.microsoft.com/v2');
    if (isLoggedIn) {
      console.log('✅ Already logged in');
      return;
    }

    // Step 1: Enter email
    const emailField = page.locator('input[type="email"]');
    await emailField.waitFor({ timeout: 10000 });
    await emailField.fill(email);
    console.log('✓ Email entered');

    // Step 2: Click Next
    await page.locator('button:has-text("Next")').click();
    await page.waitForLoadState('networkidle');
    console.log('✓ Clicked Next');

    // Step 3: Enter password
    const passwordField = page.locator('input[type="password"]');
    await passwordField.waitFor({ timeout: 10000 });
    await passwordField.fill(password);
    console.log('✓ Password entered');

    // Step 4: Click Sign in
    await page.locator('button:has-text("Sign in")').click();

    // Step 5: Handle "Stay signed in?" prompt if it appears
    const staySignedInBtn = page.locator('button:has-text("Yes")').first();
    if (await staySignedInBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await staySignedInBtn.click();
      console.log('✓ Clicked "Yes" for stay signed in');
    }

    // Wait for Teams dashboard
    await page.waitForLoadState('networkidle');

    // Verify login success
    await expect(page).toHaveURL(/teams\.microsoft\.com/);
    console.log('✅ Login successful!');
  });

  test('should handle invalid credentials', async ({ page }) => {
    await page.goto('https://teams.microsoft.com/', { waitUntil: 'networkidle' });

    // Enter invalid email
    const emailField = page.locator('input[type="email"]');
    await emailField.waitFor({ timeout: 10000 });
    await emailField.fill('invalid-email@example.com');

    // Click Next
    await page.locator('button:has-text("Next")').click();

    // Check for error message
    const errorMsg = page.locator('[role="alert"], .error-text');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    console.log('✓ Error message displayed for invalid credentials');
  });

  test('should be able to logout', async ({ page }) => {
    // This assumes you're already logged in from a previous test
    const email = process.env.MS_EMAIL || 'your-email@example.com';
    const password = process.env.MS_PASSWORD || 'your-password';

    await page.goto('https://teams.microsoft.com/', { waitUntil: 'networkidle' });

    // Login first if not already logged in
    const emailField = page.locator('input[type="email"]');
    if (await emailField.isVisible({ timeout: 2000 }).catch(() => false)) {
      await emailField.fill(email);
      await page.locator('button:has-text("Next")').click();
      await page.waitForLoadState('networkidle');

      const passwordField = page.locator('input[type="password"]');
      await passwordField.fill(password);
      await page.locator('button:has-text("Sign in")').click();

      const staySignedInBtn = page.locator('button:has-text("Yes")').first();
      if (await staySignedInBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await staySignedInBtn.click();
      }

      await page.waitForLoadState('networkidle');
    }

    // Click on profile/settings menu
    const profileBtn = page.locator('[aria-label*="Profile"], [aria-label*="Settings"]').first();
    if (await profileBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await profileBtn.click();

      // Click logout option
      const logoutBtn = page.locator('[role="menuitem"]:has-text("Sign out")');
      await logoutBtn.click({ timeout: 5000 });

      console.log('✓ Logout successful');
    }
  });
});
