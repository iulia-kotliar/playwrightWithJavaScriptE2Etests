import { Locator, Page } from '@playwright/test'

export class IndexPage {
    readonly page: Page;
    readonly phonesFilter: Locator
    readonly laptopsFilter: Locator
    readonly monitorsFilter: Locator
    readonly cartLink: Locator
    readonly signUpLink: Locator
    readonly logInLink: Locator
    readonly macBookProLink: Locator
    readonly iPhoneLink: Locator
    readonly bodyLocator: Locator
    readonly signUpUserNameField: Locator
    readonly signUpPasswordField: Locator
    readonly signUpButton: Locator
    readonly loginUserNameField: Locator
    readonly loginPasswordField: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.phonesFilter = page.getByRole('link', { name: 'Phones' })
        this.laptopsFilter = page.getByRole('link', { name: 'Laptops' })
        this.monitorsFilter = page.getByRole('link', { name: 'Monitors' })
        this.cartLink = page.getByTestId('cartur')
        this.logInLink = page.getByTestId('login2')
        this.signUpLink = page.getByTestId('signin2')
        this.macBookProLink = page.getByRole('link', { name: 'MacBook Pro' })
        this.iPhoneLink = page.getByRole('link', { name: 'iPhone 6 32gb' })
        this.bodyLocator = page.locator('body')
        this.signUpUserNameField = page.getByRole('textbox', { name: 'Username:' })
        this.signUpPasswordField = page.getByRole('textbox', { name: 'Password:' })
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })
        this.loginUserNameField = page.locator('#loginusername')
        this.loginPasswordField = page.locator('#loginpassword')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
    }

    async goto() {
        await this.page.goto('/index.html');
    }

    async signUp(username: string, password: string){
        await this.signUpLink.click()
        await this.signUpUserNameField.fill(username)
        await this.signUpPasswordField.fill(password)
        await this.signUpButton.click()
    }

    async login(username: string, password: string){
        await this.logInLink.click()
        await this.loginUserNameField.fill(username)
        await this.loginPasswordField.fill(password)
        await this.loginButton.click()
    }
}
