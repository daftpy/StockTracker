const { test, expect } = require('@playwright/test');

test('User can add transactions test', async ({ page }) => {
  // The user visits the site and sees the transaction table.
  await page.goto('http://localhost:3000');
  await expect(
    page.locator('text=transactions').first()
  ).toHaveAttribute('class', 'title');

  // The user fills out the input fields for a new transaction.
  await page.fill('#TransactionInputTicker', 'TSLA');
  await page.fill('#TransactionInputStockTotal', '69');
  await page.fill('#TransactionInputAvgCost', '420');
  await page.fill('#TransactionInputTransactionDate', '2022-04-20');
  await page.check('#TransactionInputBuy');
  await page.click('button#submit');
  
  /*
    The user sees a new row in the transaction table. The user
    notices all of their data was saved accurately.
  */
  await expect(
    page.locator('.transactionTicker').first()
  ).toHaveText('Ticker: TSLA')
  await expect(
    page.locator('.transactionDate').first()
  ).toHaveText('Transaction Date: 2022-04-20')
});
