import { Locator, Page } from '@playwright/test'

export class CartPage {
    readonly page: Page
    readonly placeOrderButton: Locator
    readonly nameInput: Locator
    readonly creditCardInput: Locator
    readonly purchaseButton: Locator

    constructor(page: Page) {
        this.page = page
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
        this.nameInput = page.getByTestId('name')
        this.creditCardInput = page.getByTestId('card')
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' })
    }

    async fillOutOrderInfo(name: string, creditCard: string){
        await this.nameInput.fill(name)
        await this.creditCardInput.fill(creditCard)
    }
}