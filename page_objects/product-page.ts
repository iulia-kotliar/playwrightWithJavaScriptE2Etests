import { Locator, Page } from '@playwright/test'

export class ProductPage{
    readonly page: Page
    readonly addToCartButton: Locator

    constructor(page: Page){
        this.page = page
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' }   )
    }
}