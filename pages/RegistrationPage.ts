import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
    private readonly page: Page;
    
    // Locators
    private readonly txtFirstname: Locator;
    private readonly txtLastname: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkdPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    // constructors
    constructor(page: Page) {
        this.page = page;
        
        // locators
        this.txtFirstname = page.locator('#input-firstname');
        this.txtLastname = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephone = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirmPassword = page.locator('#input-confirm');
        this.chkdPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('input[value="Continue"]');
        this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
    }

    // Set first name
    async setFirstName(fname: string): Promise<void> {
        await this.txtFirstname.fill(fname);
    }

    // Set last name
    async setLastName(lname: string): Promise<void> {
        await this.txtLastname.fill(lname);
    }

    // set email
    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    // set telephone
    async setTelephone(tel: string): Promise<void> {
        await this.txtTelephone.fill(tel);
    }

    // set password
    async setPassword(pwd: string): Promise<void> {
        await this.txtPassword.fill(pwd);
    }

    // confirm password
    async setConfirmPassword(pwd: string): Promise<void> {
        await this.txtConfirmPassword.fill(pwd);
    }

    // privacy policy checkbox
    async setPrivacyPolicy(): Promise<void> {
        await this.chkdPolicy.check();
    }

    // Click on Continue button
    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    // Gets the confirmation message
    async getConfirmationMsg(): Promise<string> {
        return await this.msgConfirmation.textContent() ?? '';
    }

    // Registration workflow
    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.telephone);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);
        await this.setPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();
    }
}
