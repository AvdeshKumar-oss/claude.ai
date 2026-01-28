import { test, expect } from '@playwright/test';

test('Dynamic ID Handling', async ({ page }) => {
  await page.goto(
    'https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9',
    { waitUntil: 'domcontentloaded' }
  );
  await page.getByRole('tab', { name: 'Flaky Selectors' }).click();

  await page.getByRole('button', { name: 'Regenerate All IDs' }).click();

  const betaItem = page.getByRole('listitem', { name: 'Beta' });
  await betaItem.click();

  await expect(betaItem).toHaveClass(/selected/);
});
