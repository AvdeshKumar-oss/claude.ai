import { test, expect } from '@playwright/test';

test('Dynamic ID Handling', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Flaky Selectors' }).click();

  await page.getByRole('button', { name: 'Regenerate All IDs' }).click();

  const betaItem = page.getByRole('listitem', { name: 'Beta' });
  await betaItem.click();

  await expect(betaItem).toHaveClass(/selected/);
});
