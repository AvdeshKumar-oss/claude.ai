import { test, expect } from '@playwright/test';

test('Load and Verify List Items', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Timing Challenges' }).click();

  const loadMore = page.getByRole('button', { name: 'Load More Items' });
  const items = page.locator('[data-testid="list-item"]');

  for (let i = 0; i < 3; i++) {
    const previousCount = await items.count();
    await loadMore.click();
    await expect(items).toHaveCount(previousCount + 5);
  }

  await expect(items).toHaveCount(15);

  const statuses = await items.locator('.status').allTextContents();
  expect(statuses.some(s => s.includes('active'))).toBeTruthy();
  expect(statuses.some(s => s.includes('pending'))).toBeTruthy();
});
