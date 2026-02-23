# Playwright Automation Setup - Complete Guide 📖

**Project**: Playwright Automation for Microsoft Teams Login Testing  
**Date**: February 23, 2026  
**Status**: ✅ Complete Setup

---

## Table of Contents

1. [Complete Process Summary](#complete-process-summary)
2. [Phase-by-Phase Breakdown](#phase-by-phase-breakdown)
3. [Project Structure](#project-structure)
4. [Understanding Reports](#understanding-reports)
5. [Why 2 Reports?](#why-2-reports)
6. [Current Setup Status](#current-setup-status)
7. [Quick Commands Reference](#quick-commands-reference)
8. [Next Steps](#next-steps)

---

## Complete Process Summary

This document outlines the entire journey of setting up a **Playwright Automation Framework** for testing Microsoft Teams login functionality. From fixing system issues to creating automated tests, here's everything that was done.

### Key Achievements
- ✅ Resolved PowerShell execution policy restrictions
- ✅ Installed Playwright with 3 browsers (Chromium, Firefox, WebKit)
- ✅ Created automated Teams login test scenarios
- ✅ Set up HTML test reporting system
- ✅ Organized test structure and npm scripts
- ✅ Created secure credential management with `.env` files

---

## Phase-by-Phase Breakdown

### **Phase 1: Fix PowerShell Execution Policy Issue** ✅

#### Problem Encountered
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because 
running scripts is disabled on this system.
```

#### Root Cause
PowerShell had script execution disabled for security reasons, preventing npm from running.

#### Solution Applied
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

#### What This Does
- Sets execution policy to `RemoteSigned` for the current user
- `RemoteSigned`: Allows local scripts to run + requires signed remote scripts
- `CurrentUser`: Applies only to current user (safe, doesn't affect system-wide)
- `-Force`: Applies without confirmation

#### Result
✅ PowerShell can now execute npm and other scripts

---

### **Phase 2: Initialize Playwright Project** ✅

#### Command Executed
```bash
npm init playwright@latest --yes -- . --quiet --browser=chromium --browser=firefox --browser=webkit --gha
```

#### Command Breakdown

| Parameter | Purpose |
|-----------|---------|
| `npm init playwright@latest` | Initialize latest Playwright version |
| `--yes` | Skip interactive prompts, use defaults |
| `--` | Separator for additional arguments |
| `.` | Install in current directory |
| `--quiet` | Minimal output during installation |
| `--browser=chromium` | Install Chromium browser |
| `--browser=firefox` | Install Firefox browser |
| `--browser=webkit` | Install WebKit (Safari) browser |
| `--gha` | Generate GitHub Actions workflow file |

#### What Was Created

**Project Structure**:
```
Playwright Automation/
├── e2e/                          # Test files directory
│   ├── example.spec.ts           # Original demo tests
│   └── teams-login.spec.ts       # Teams automation tests
├── node_modules/                 # Dependencies
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Project metadata
├── package-lock.json             # Dependency lock file
├── .gitignore                    # Git ignore rules
└── test-results/                 # Test execution logs
```

#### Browser Downloads
- **Chromium (v1208)**: 172.8 MiB - Google's browser engine
- **Firefox (v1509)**: 110.2 MiB - Mozilla's browser engine
- **WebKit (implicit)**: Included - Apple's browser engine
- **FFmpeg (v1011)**: 1.3 MiB - For video recording

**Total Size**: ~400+ MB

**Download Time**: 10-15 minutes (depending on internet speed)

---

### **Phase 3: Create Teams Login Automation Tests** ✅

#### Test File Created: `e2e/teams-login.spec.ts`

The test file includes **3 test scenarios**:

**Test 1: Successful Login**
```typescript
test('should login successfully with valid credentials')
```
- Navigates to Teams
- Enters email/username
- Clicks "Next"
- Enters password
- Clicks "Sign in"
- Handles "Stay signed in?" prompt
- Verifies successful login

**Test 2: Error Handling**
```typescript
test('should handle invalid credentials')
```
- Tests error messages with invalid email
- Verifies error validation

**Test 3: Logout**
```typescript
test('should be able to logout')
```
- Tests logout functionality
- Verifies user is properly signed out

#### key Features
- ✅ Uses environment variables for credentials (`.env` file)
- ✅ Handles dynamic UI elements and waits
- ✅ Includes detailed logging with console messages
- ✅ Graceful error handling for optional elements

---

### **Phase 4: Organize Test Structure** ✅

#### Issue Found
- Two test directories existed: `e2e/` and `tests/`
- Playwright config pointed to `e2e/` by default
- Tests in `tests/` folder weren't being discovered

#### Solution Implemented
1. **Moved** `teams-login.spec.ts` to `e2e/` folder
2. **Kept** Playwright config pointing to `e2e/` directory
3. **Updated** npm scripts to use correct naming patterns
4. **Verified** all tests are discoverable

#### Updated npm Scripts
```json
{
  "scripts": {
    "test": "playwright test",
    "test:teams": "playwright test teams-login",
    "test:debug": "playwright test --debug",
    "test:headed": "playwright test --headed",
    "test:report": "playwright show-report"
  }
}
```

---

## Project Structure

### Directory Layout

```
Playwright Automation/ (Root)
│
├── e2e/                              ← All test files here
│   ├── example.spec.ts               (Original demo tests - 2 tests)
│   └── teams-login.spec.ts           (Teams automation - 3 tests)
│
├── test-results/                     ← Generated after each test run
│   └── (browser-specific folders)
│
├── playwright-report/                ← HTML reports
│   ├── index.html
│   └── data/
│
├── node_modules/                     ← Dependencies (don't edit)
│   └── @playwright/ (test framework)
│
├── .github/
│   └── workflows/
│       └── playwright.yml            ← CI/CD for GitHub Actions
│
├── Configuration Files:
│   ├── playwright.config.ts          ← Playwright settings
│   ├── package.json                  ← Project metadata
│   ├── package-lock.json             ← Dependency versions (locked)
│   └── .gitignore                    ← Git ignore rules
│
├── Credential Files:
│   ├── .env.example                  ← Template (safe to commit)
│   └── .env                          ← Actual credentials (IN .gitignore)
│
└── Documentation:
    ├── README.md                     ← Project overview
    └── SETUP_GUIDE.md                ← This file
```

---

## Understanding Reports

### What are Test Reports?

Test reports are **automated documents** generated by Playwright after running tests. They contain:
- ✅ Test results (passed/failed)
- ⏱️ Execution times
- 📸 Screenshots on failures
- 📹 Video recordings (if enabled)
- 📋 Error traces and stack traces
- 🔍 Browser/OS information

### Report Generation

Playwright **automatically creates reports** every time you run tests:

```bash
npm test                    # Runs tests → Generates report
npm run test:headed         # Runs with visible browser → Generates report
npm run test:teams          # Runs Teams tests → Generates report
npm run test:debug          # Interactive debug mode → Generates report
```

### Where Reports are Stored

**Location**: `<project>/playwright-report/`

**Files Created**:
```
playwright-report/
├── index.html              ← Main report page (open in browser)
├── data/
│   ├── test-results/
│   └── trace files
└── resources/
```

### How to View Reports

#### Option 1: Using npm script
```bash
npm run test:report
```
Automatically opens the HTML report in your default browser.

#### Option 2: Manual View
1. Run tests: `npm test`
2. Look for message: `To open last HTML report run:`
3. Follow the command provided

#### Option 3: File Explorer
1. Navigate to `playwright-report/` folder
2. Double-click `index.html`
3. Opens in your default browser

### Report Features

**Interactive Dashboard**:
- 🔍 Filter tests by status (passed/failed)
- 📊 View statistics (duration, count)
- 🎬 Play video recordings of test execution
- 📷 View screenshots at each step
- 💬 Read detailed error messages
- 🕐 Check execution timeline

---

## Why 2 Reports?

### The Confusion Explained

You might see test output mentioning **multiple test files**. This is **normal and expected**. Here's why:

### Current Test Files

You have **2 test specification files**:

**File 1: `e2e/example.spec.ts`**
- Original demo tests from Playwright
- Tests the Playwright documentation website
- Contains **2 tests**:
  1. "has title" - Verifies page title
  2. "get started link" - Tests navigation

**File 2: `e2e/teams-login.spec.ts`**
- Your Teams automation tests
- Tests Microsoft Teams login
- Contains **3 tests**:
  1. "should login successfully with valid credentials"
  2. "should handle invalid credentials"
  3. "should be able to logout"

### Total Tests: 5

```
Total Tests = example.spec.ts (2) + teams-login.spec.ts (3) = 5 tests
```

### Report Organization

**Single Report with Multiple Sections**:
```
Playwright Test Report
├── Example Tests
│   ├── ✅ has title (Chromium)
│   ├── ✅ has title (Firefox)
│   ├── ✅ has title (WebKit)
│   ├── ❌ get started link (Chromium)
│   └── ... (for each browser)
│
└── Teams Login Tests
    ├── ✅ should login successfully (Chromium)
    ├── ✅ should handle invalid credentials (Chromium)
    ├── ✅ should be able to logout (Chromium)
    └── ... (for each browser)
```

### Why Multiple Copies of Each Test?

**Browser Matrix**: Each test runs on **3 different browsers**:

```
1 Test × 3 Browsers = 3 Results
```

Example:
```
example.spec.ts → has title
├── [Chromium] ✅ Passed (0.5s)
├── [Firefox] ✅ Passed (0.6s)
└── [WebKit] ✅ Passed (0.5s)
```

### Total Count Calculation

```
Example Tests (2) × 3 Browsers = 6 results
Teams Tests (3) × 3 Browsers = 9 results
─────────────────────────────
Total: 15 test results
```

But they're organized as **5 tests, run across 3 browsers**.

### Viewing Test Results by Category

In the HTML report, you can **filter and sort**:
- By test name
- By status (passed/failed)
- By browser
- By duration

---

## Current Setup Status

### ✅ Completed Components

| Component | Status | Details |
|-----------|--------|---------|
| **Playwright Framework** | ✅ Installed | v1.58.2 |
| **Browsers** | ✅ Downloaded | Chromium, Firefox, WebKit |
| **Test Framework** | ✅ Ready | TypeScript ready |
| **Example Tests** | ✅ Working | 2 demo tests |
| **Teams Automation** | ✅ Ready | 3 test scenarios |
| **npm Scripts** | ✅ Configured | 5 convenient commands |
| **Reports** | ✅ Auto-generated | HTML dashboard |
| **GitHub Actions** | ✅ Configured | CI/CD workflow |
| **Project Structure** | ✅ Organized | Clean, maintainable |
| **Documentation** | ✅ Complete | README + This guide |

### ⏳ Setup Required Before Running Tests

| Item | Required | How To |
|------|----------|--------|
| **Credentials** | ✅ Yes | See next section |
| **Teams Account** | ✅ Yes | Use your actual Teams account |
| **Internet** | ✅ Yes | Required for Teams login |
| **.env File** | ✅ Yes | Copy `.env.example` to `.env` |

### Setting Up Credentials

**Step 1: Create `.env` file**
```bash
copy .env.example .env
```

**Step 2: Edit `.env` with your credentials**
```
MS_EMAIL=your-email@example.com
MS_PASSWORD=your-password
```

**Step 3: Keep `.env` secure**
- Never commit to Git (already in `.gitignore`)
- Don't share with others
- Contains sensitive information

---

## Quick Commands Reference

### Common Commands

```bash
# Run all tests in all supported browsers
npm test

# Run only Teams login tests
npm run test:teams

# Run tests with visible browser window
npm run test:headed

# Run tests in debug mode (interactive)
npm run test:debug

# View the test report
npm run test:report

# Install dependencies
npm install

# Update packages
npm update
```

### Advanced Commands

```bash
# Run tests with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in specific file
npx playwright test e2e/teams-login.spec.ts

# Run tests with reporter
npx playwright test --reporter=html

# Generate test trace
npx playwright test --trace=on

# List all available tests
npx playwright test --list
```

### Debugging Commands

```bash
# Step through tests interactively
npm run test:debug

# Set slow mode (pause between actions)
npx playwright test --slow-mo=1000

# Set timeout for debugging
npx playwright test --timeout=600000

# Run in headed mode with slow motion
npx playwright test --headed --slow-mo=500
```

---

## Next Steps

### 1. **Test Your Setup**
```bash
# Run a quick test to verify everything works
npm test
```

### 2. **Add Your Credentials**
```bash
# Create .env file
copy .env.example .env

# Edit .env with your Teams login credentials
```

### 3. **Run Teams Tests**
```bash
# Run Teams automation tests
npm run test:teams

# Or with visible browser
npx playwright test teams-login --headed
```

### 4. **Review Results**
```bash
# View detailed HTML report
npm run test:report
```

### 5. **Customize Tests** (Optional)
- Edit `e2e/teams-login.spec.ts` for your needs
- Add more test scenarios
- Adjust timeouts if needed
- Update selectors if Teams UI changes

### 6. **Set Up CI/CD** (Optional)
- GitHub Actions workflow already configured
- Push code to GitHub to run tests automatically
- View results in Actions tab

### 7. **Extend Automation**
- Add more login scenarios
- Test post-login workflows
- Create data-driven tests
- Add visual regression testing

---

## Troubleshooting

### Issue: "Cannot find selector" errors

**Cause**: Teams UI may have changed

**Solution**:
1. Inspect Teams login page (F12)
2. Find new selector for the field
3. Update `e2e/teams-login.spec.ts`

### Issue: Tests timeout

**Cause**: Slow network or UI delays

**Solution**:
```bash
npx playwright test --timeout=60000
```

### Issue: Tests fail on 2FA

**Teams 2FA Support**: Not automated yet

**Manual Solution**:
```typescript
// Add pause for manual 2FA entry
await page.pause();
```

### Issue: Report not opening

**Solution**:
```bash
npm run test:report
# Or manually: explorer playwright-report/index.html
```

---

## Key Files Overview

### `playwright.config.ts`
- Main Playwright configuration
- Browser settings
- Timeout values
- Reporter settings
- Base URL (if needed)

### `e2e/teams-login.spec.ts`
- Teams login test scenarios
- Uses environment variables for credentials
- Handles dynamic UI elements
- Includes error handling

### `package.json`
- Project metadata
- npm scripts
- Dependencies list
- Project version info

### `.env.example`
- Template for credentials
- Safe to commit (no secrets)
- Shows required variables
- Copy to `.env` and fill with real data

### `.env` (Create this)
- **DO NOT COMMIT TO GIT**
- Contains your actual credentials
- Already in `.gitignore` (safe)
- Required for running tests

### `.github/workflows/playwright.yml`
- GitHub Actions CI/CD configuration
- Auto-runs tests on push/PR
- Cross-platform testing (Windows, Mac, Linux)

---

## Summary

You now have a **professional-grade Playwright automation framework** set up for testing Microsoft Teams login functionality.

### What You've Learned
- ✅ How to install and configure Playwright
- ✅ Understanding test execution and reports
- ✅ How to manage test credentials securely
- ✅ Running tests in different modes
- ✅ Interpreting test results

### What's Ready to Use
- ✅ 3 login test scenarios
- ✅ Automated browser testing
- ✅ HTML test reports
- ✅ GitHub Actions integration
- ✅ Secure credential management

### Next Action
Add your Teams credentials to `.env` file and run:
```bash
npm run test:teams
```

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test Guide](https://playwright.dev/docs/intro)
- [Selectors Reference](https://playwright.dev/docs/selectors)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [GitHub Actions + Playwright](https://playwright.dev/docs/ci)

---

**Document Created**: February 23, 2026  
**Framework**: Playwright v1.58.2  
**Browsers**: Chromium, Firefox, WebKit  
**Status**: ✅ Ready for Testing

Happy Testing! 🎭 🚀
