# Playwright Practice Test Login Automation

This project automates login testing for Practice Test website (practicetestautomation.com) using Playwright with student credentials.

## 📋 Files Created

- **`e2e/practice-login.spec.ts`** - Practice test login automation with 3 test scenarios
  - TC1: Positive login test (valid credentials)
  - TC2: Negative username test (invalid username)
  - TC3: Negative password test (invalid password)
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

### 3. Run Practice Test Login Tests

```bash
npm run test:practice
```

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:practice` | Run practice test login tests only |
| `npm run test:debug` | Run tests in debug mode (interactive) |
| `npm run test:headed` | Run tests with browser window visible |
| `npm run test:report` | View HTML test report |

## 🔧 Customizing the Script

If the selectors don't match the practice test login page, you can find the correct ones:

### 1. Open Developer Tools
- Right-click on the practice test login page → **Inspect**

### 2. Find the Email Field
```javascript
// In your browser console:
document.querySelector('input[type="email"]')
```

### 3. Update the test file
In `practice-login.spec.ts`, replace these selectors:

```typescript
// Username field
const usernameInput = page.locator('input#username');

// Password field  
const passwordInput = page.locator('input#password');
```

## 🛡️ Security Best Practices

✅ **DO:**
- Use environment variables for credentials (`.env` file)
- Add `.env` to `.gitignore` (already included)
- Use `process.env.TEST_USERNAME` and `process.env.TEST_PASSWORD`

❌ **DON'T:**
- Commit credentials to git
- Hard-code passwords in test files
- Share your `.env` file

## 📊 Test Features

The `practice-login.spec.ts` includes:

1. **Positive Login Test (TC1)** - Valid credentials (student/Password123) 
2. **Negative Username Test (TC2)** - Invalid username validation
3. **Negative Password Test (TC3)** - Invalid password validation
4. **Error Message Validation** - Verifies correct error messages appear
5. **Cross-Browser Testing** - Runs on Chromium, Firefox, and WebKit
6. **Page Navigation** - Validates successful login redirects

## 🐛 Troubleshooting

### Test runs but doesn't log in
- Check if username/password selectors match the practice test page
- Verify credentials in `.env` file are correct (student/Password123)
- Run with `npm run test:headed` to see what's happening

### "Cannot find selector" error
- The practice test page selectors may need updating
- Inspect the page and find the correct selector
- Update the test file with the correct selector

### 2FA/MFA Required
- The practice test site uses basic username/password authentication
- No special handling needed for this site

## 📚 More Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [Selectors Guide](https://playwright.dev/docs/selectors)

---

**Happy Testing! 🎭**
