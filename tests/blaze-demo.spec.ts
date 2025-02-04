import { test, expect } from '@playwright/test';
import { IndexPage } from '../page_objects/index-page';
import { ProductPage } from '../page_objects/product-page';
import { CartPage } from '../page_objects/cart-page';

let indexPage: IndexPage;
let productPage: ProductPage;
let cartPage: CartPage;
const name = 'test'
const card = '1111'
const total = 'Total: 1100'
const price = '1100 USD';
const confirmationMessage = 'Thank you for your purchase!'

test.beforeEach(async ({ page }) => {
  indexPage = new IndexPage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
});

test('Buy laptopn as a guest', async ({ page }) => {
  //Act
  await indexPage.goto();
  await indexPage.laptopsFilter.click();
  await indexPage.macBookProLink.click();
  await productPage.addToCartButton.click();
  await AwaitAddToCartResponse(page);
  await Purchase(indexPage, total, cartPage, name, card);
  //Assert
  await expect(indexPage.bodyLocator).toContainText(confirmationMessage);
  await expect(indexPage.bodyLocator).toContainText(price);
});

test('Buy phone as registered user', async ({ page }) => {
  //Arrange
  const total = 'Total: 790'
  const price = '790 USD';
  const username = 'test' + crypto.randomUUID().toString()
  const password = 'test'
  //Act
  await indexPage.goto();
  await indexPage.signUp(username, password);
  await indexPage.login(username, password);  
  await indexPage.phonesFilter.click();
  await indexPage.iPhoneLink.click();
  await productPage.addToCartButton.click();
  await AwaitAddToCartResponse(page);
  await Purchase(indexPage, total, cartPage, name, card);
  //Assert
  await expect(indexPage.bodyLocator).toContainText(confirmationMessage);
  await expect(indexPage.bodyLocator).toContainText(price);
});

async function Purchase(indexPage: IndexPage, total: string, cartPage: CartPage, name: string, card: string) {
  await indexPage.cartLink.click();
  await expect(indexPage.bodyLocator).toContainText(total);
  await cartPage.placeOrderButton.click();
  await cartPage.fillOutOrderInfo(name, card);
  await cartPage.purchaseButton.click();
}

async function AwaitAddToCartResponse(page) {
  await page.waitForResponse(response => response.url().includes('/addtocart')
    && response.status() === 200
    && response.request().method() === 'POST');
}
