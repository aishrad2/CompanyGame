import { test, expect } from '@playwright/test';

test('visual verification of card flip', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the "New Game" button to populate the cards
  await page.getByRole('button', { name: 'New Game' }).click();

  // Wait for the first card's back to be visible before taking the screenshot
  await expect(page.locator('.card .back').first()).toBeVisible();

  // Screenshot the initial state
  await page.screenshot({ path: 'verification/01-initial-state.png' });

  // Click the back of the first card
  await page.locator('.card .back').first().click();

  // Wait for the front of the first card to be visible after the flip
  await expect(page.locator('.card .front').first()).toBeVisible();

  // Screenshot the flipped state
  await page.screenshot({ path: 'verification/02-flipped-state.png' });
});
