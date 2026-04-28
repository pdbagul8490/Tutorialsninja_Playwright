# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: AccountRegistration.spec.ts >> User registration test @master @sanity @regression
- Location: tests\AccountRegistration.spec.ts:26:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Target page, context or browser has been closed
Call log:
  - waiting for locator('h1:has-text("Your Account Has Been Created!")')

```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | 
  3  | export class RegistrationPage {
  4  |     private readonly page: Page;
  5  |     
  6  |     // Locators
  7  |     private readonly txtFirstname: Locator;
  8  |     private readonly txtLastname: Locator;
  9  |     private readonly txtEmail: Locator;
  10 |     private readonly txtTelephone: Locator;
  11 |     private readonly txtPassword: Locator;
  12 |     private readonly txtConfirmPassword: Locator;
  13 |     private readonly chkdPolicy: Locator;
  14 |     private readonly btnContinue: Locator;
  15 |     private readonly msgConfirmation: Locator;
  16 | 
  17 |     // constructors
  18 |     constructor(page: Page) {
  19 |         this.page = page;
  20 |         
  21 |         // locators
  22 |         this.txtFirstname = page.locator('#input-firstname');
  23 |         this.txtLastname = page.locator('#input-lastname');
  24 |         this.txtEmail = page.locator('#input-email');
  25 |         this.txtTelephone = page.locator('#input-telephone');
  26 |         this.txtPassword = page.locator('#input-password');
  27 |         this.txtConfirmPassword = page.locator('#input-confirm');
  28 |         this.chkdPolicy = page.locator('input[name="agree"]');
  29 |         this.btnContinue = page.locator('input[value="Continue"]');
  30 |         this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
  31 |     }
  32 | 
  33 |     // Set first name
  34 |     async setFirstName(fname: string): Promise<void> {
  35 |         await this.txtFirstname.fill(fname);
  36 |     }
  37 | 
  38 |     // Set last name
  39 |     async setLastName(lname: string): Promise<void> {
  40 |         await this.txtLastname.fill(lname);
  41 |     }
  42 | 
  43 |     // set email
  44 |     async setEmail(email: string): Promise<void> {
  45 |         await this.txtEmail.fill(email);
  46 |     }
  47 | 
  48 |     // set telephone
  49 |     async setTelephone(tel: string): Promise<void> {
  50 |         await this.txtTelephone.fill(tel);
  51 |     }
  52 | 
  53 |     // set password
  54 |     async setPassword(pwd: string): Promise<void> {
  55 |         await this.txtPassword.fill(pwd);
  56 |     }
  57 | 
  58 |     // confirm password
  59 |     async setConfirmPassword(pwd: string): Promise<void> {
  60 |         await this.txtConfirmPassword.fill(pwd);
  61 |     }
  62 | 
  63 |     // privacy policy checkbox
  64 |     async setPrivacyPolicy(): Promise<void> {
  65 |         await this.chkdPolicy.check();
  66 |     }
  67 | 
  68 |     // Click on Continue button
  69 |     async clickContinue(): Promise<void> {
  70 |         await this.btnContinue.click();
  71 |     }
  72 | 
  73 |     // Gets the confirmation message
  74 |     async getConfirmationMsg(): Promise<string> {
> 75 |         return await this.msgConfirmation.textContent() ?? '';
     |                                           ^ Error: locator.textContent: Target page, context or browser has been closed
  76 |     }
  77 | 
  78 |     // Registration workflow
  79 |     async completeRegistration(userData: {
  80 |         firstName: string;
  81 |         lastName: string;
  82 |         email: string;
  83 |         telephone: string;
  84 |         password: string;
  85 |     }): Promise<void> {
  86 |         await this.setFirstName(userData.firstName);
  87 |         await this.setLastName(userData.lastName);
  88 |         await this.setEmail(userData.email);
  89 |         await this.setTelephone(userData.telephone);
  90 |         await this.setPassword(userData.password);
  91 |         await this.setConfirmPassword(userData.password);
  92 |         await this.setPrivacyPolicy();
  93 |         await this.clickContinue();
  94 |         await expect(this.msgConfirmation).toBeVisible();
  95 |     }
  96 | }
  97 | 
```