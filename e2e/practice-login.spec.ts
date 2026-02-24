import { test, expect } from '@playwright/test';

/**
 * Practice Test Automation - Login Tests
 * 
 * Test Cases:
 * 1. Positive Login Test
 * 2. Negative Username Test
 * 3. Negative Password Test
 * 
 * Setup:
 * 1. Create .env file from .env.example
 * 2. Run: npm test -- practice-login.spec.ts
 */

test.describe('Practice Test Automation - Login Tests', () => {
  
  // Setup - Navigate to practice test page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.waitForLoadState('networkidle');
  });

  // ==========================================
  // TEST CASE 1: Positive Login Test
  // ==========================================
  test('TC1: Positive Login Test - Valid Credentials', async ({ page }) => {
    console.log('🧪 TC1: Starting positive login test with valid credentials...');

    // Step 1: Open page (already done in beforeEach)
    console.log('✓ Page opened: https://practicetestautomation.com/practice-test-login/');

    // Step 2: Type username 'student' into Username field
    const usernameField = page.locator('#username');
    await usernameField.fill('student');
    console.log('✓ Username "student" entered into Username field');

    // Step 3: Type password 'Password123' into Password field
    const passwordField = page.locator('#password');
    await passwordField.fill('Password123');
    console.log('✓ Password "Password123" entered into Password field');

    // Step 4: Push Submit button
    const submitButton = page.locator('#submit');
    await submitButton.click();
    console.log('✓ Submit button clicked');

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Step 5: Verify new page URL contains 'practicetestautomation.com/logged-in-successfully/'
    const currentURL = page.url();
    expect(currentURL).toContain('practicetestautomation.com/logged-in-successfully/');
    console.log('✓ URL verification passed:', currentURL);

    // Step 6: Verify new page contains expected text ('Congratulations' or 'successfully logged in')
    const pageContent = await page.content();
    const hasExpectedText = pageContent.includes('Congratulations') || 
                            pageContent.includes('successfully logged in');
    expect(hasExpectedText).toBe(true);
    console.log('✓ Expected text found on page (Congratulations or successfully logged in)');

    // Step 7: Verify button 'Log out' is displayed on the new page
    const logoutButton = page.locator('a, button').filter({ hasText: /Log\s*out/i });
    await expect(logoutButton).toBeVisible();
    console.log('✓ Logout button is visible on the page');

    console.log('✅ TC1: Positive Login Test PASSED');
  });

  // ==========================================
  // TEST CASE 2: Negative Username Test
  // ==========================================
  test('TC2: Negative Username Test - Invalid Username', async ({ page }) => {
    console.log('🧪 TC2: Starting negative username test...');

    // Step 1: Open page (already done in beforeEach)
    console.log('✓ Page opened: https://practicetestautomation.com/practice-test-login/');

    // Step 2: Type username 'incorrectUser' into Username field
    const usernameField = page.locator('#username');
    await usernameField.fill('incorrectUser');
    console.log('✓ Username "incorrectUser" entered into Username field');

    // Step 3: Type password 'Password123' into Password field
    const passwordField = page.locator('#password');
    await passwordField.fill('Password123');
    console.log('✓ Password "Password123" entered into Password field');

    // Step 4: Push Submit button
    const submitButton = page.locator('#submit');
    await submitButton.click();
    console.log('✓ Submit button clicked');

    // Wait for error message to appear
    await page.waitForLoadState('networkidle');

    // Step 5: Verify error message is displayed
    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
    console.log('✓ Error message is displayed');

    // Step 6: Verify error message text is 'Your username is invalid!'
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('Your username is invalid!');
    console.log('✓ Error message text verification passed:', errorText);

    console.log('✅ TC2: Negative Username Test PASSED');
  });

  // ==========================================
  // TEST CASE 3: Negative Password Test
  // ==========================================
  test('TC3: Negative Password Test - Invalid Password', async ({ page }) => {
    console.log('🧪 TC3: Starting negative password test...');

    // Step 1: Open page (already done in beforeEach)
    console.log('✓ Page opened: https://practicetestautomation.com/practice-test-login/');

    // Step 2: Type username 'student' into Username field
    const usernameField = page.locator('#username');
    await usernameField.fill('student');
    console.log('✓ Username "student" entered into Username field');

    // Step 3: Type password 'incorrectPassword' into Password field
    const passwordField = page.locator('#password');
    await passwordField.fill('incorrectPassword');
    console.log('✓ Password "incorrectPassword" entered into Password field');

    // Step 4: Push Submit button
    const submitButton = page.locator('#submit');
    await submitButton.click();
    console.log('✓ Submit button clicked');

    // Wait for error message to appear
    await page.waitForLoadState('networkidle');

    // Step 5: Verify error message is displayed
    const errorMessage = page.locator('#error');
    await expect(errorMessage).toBeVisible();
    console.log('✓ Error message is displayed');

    // Step 6: Verify error message text is 'Your password is invalid!'
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('Your password is invalid!');
    console.log('✓ Error message text verification passed:', errorText);

    console.log('✅ TC3: Negative Password Test PASSED');
  });

});
