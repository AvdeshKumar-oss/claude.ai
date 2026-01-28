import { test, expect } from '@playwright/test';

test('Modal Confirmation Flow', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: 'Responsive' }).click();

  await page.getByRole('button', { name: 'Open Modal' }).click();

  const mainModal = page.locator('.modal').first();
  await expect(mainModal).toBeVisible();

  await mainModal.getByRole('button', { name: 'Show Details' }).click();

  const nestedModal = page.locator('.modal').nth(1);
  await expect(nestedModal).toBeVisible();

  await nestedModal.getByRole('button', { name: 'Confirm' }).click();

  await expect(mainModal).toHaveCount(0);
  await expect(nestedModal).toHaveCount(0);

  await expect(page.getByText('confirmed')).toBeVisible();
});
