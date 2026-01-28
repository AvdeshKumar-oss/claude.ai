import { test, expect } from '@playwright/test';

test('Conditional Login Flow', async ({ page }) => {
  await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9',
    { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: 'Flaky Selectors' }).click();

  // Admin login
  await page.getByRole('button', { name: 'Admin User' }).click();
  await page.getByText('Dashboard').waitFor();

  await expect(page.getByText('Admin Panel')).toBeVisible();
  await expect(page.getByText('Standard Panel')).toHaveCount(0);

  await page.getByRole('button', { name: 'Logout' }).click();

  // Standard login
  await page.getByRole('button', { name: 'Standard User' }).click();
  await page.getByText('Dashboard').waitFor();

  await expect(page.getByText('Standard Panel')).toBeVisible();
  await expect(page.getByText('Admin Panel')).toHaveCount(0);
});
