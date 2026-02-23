# Playwright Teams Login Automation

This project automates Microsoft Teams login using Playwright.

## 📋 Files Created

- **`tests/example.spec.ts`** - Basic Teams login test
- **`tests/teams-login.spec.ts`** - Advanced login tests with multiple scenarios
- **`.env.example`** - Environment variables template
- **`playwright.config.ts`** - Playwright configuration

## 🚀 Quick Start

### 1. Set Up Credentials

```bash
# Copy the example env file
copy .env.example .env

# Edit .env and add your credentials
# .env file content:
# MS_EMAIL=your-email@example.com
# MS_PASSWORD=your-password
```

### 2. Run Basic Login Test

```bash
npm test
```

### 3. Run Teams-Specific Login Tests

```bash
npm run test:teams
```

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:teams` | Run Teams login tests only |
| `npm run test:debug` | Run tests in debug mode (interactive) |
| `npm run test:headed` | Run tests with browser window visible |
| `npm run test:report` | View HTML test report |

## 🔧 Customizing the Script

If the selectors don't match your Teams login page, you can find the correct ones:

### 1. Open Developer Tools
- Right-click on the Teams login page → **Inspect**

### 2. Find the Email Field
```javascript
// In your browser console:
document.querySelector('input[type="email"]')
```

### 3. Update the test file
In `teams-login.spec.ts`, replace these selectors:

```typescript
// Old selector
const emailInput = page.locator('input[type="email"]');

// New selector (if needed)
const emailInput = page.locator('#youremailid');
```

## 🛡️ Security Best Practices

✅ **DO:**
- Use environment variables for credentials (`.env` file)
- Add `.env` to `.gitignore` (already included)
- Use `process.env.MS_EMAIL` and `process.env.MS_PASSWORD`

❌ **DON'T:**
- Commit credentials to git
- Hard-code passwords in test files
- Share your `.env` file

## 📊 Test Features

The `teams-login.spec.ts` includes:

1. **Basic Login** - Email → Next → Password → Sign in
2. **Error Handling** - Detects and validates error messages
3. **"Stay Signed In" Prompt** - Handles the optional prompt
4. **Logout Test** - Tests logout functionality
5. **Network Wait** - Waits for page to fully load

## 🐛 Troubleshooting

### Test runs but doesn't log in
- Check if email/password selectors match your Teams page
- Verify credentials in `.env` file are correct
- Run with `npm run test:headed` to see what's happening

### "Cannot find selector" error
- The Teams UI may have changed
- Inspect the page and find the new selector
- Update the test file with the correct selector

### 2FA/MFA Required
- The script doesn't handle 2FA yet
- You can add it manually: `await page.pause();` to pause and enter 2FA code

## 📚 More Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [Selectors Guide](https://playwright.dev/docs/selectors)

---

**Happy Testing! 🎭**
