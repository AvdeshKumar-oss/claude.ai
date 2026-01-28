import { test, expect } from '@playwright/test';

test('Delayed Button Flow', async ({ page }) => {
  await page.goto(
    'https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9',
    { waitUntil: 'domcontentloaded' }
  );
  await page.pause();
  // Handle cookie banner if present
  const acceptCookies = page.getByRole('button', { name: 'Accept All Cookies' });
  if (await acceptCookies.isVisible()) {
    await acceptCookies.click();
  }

  // ✅ Target the correct iframe explicitly
  const appFrame = page.frameLocator('iframe[title="Claude content"]');

  const timingTab = appFrame.getByRole('tab', { name: 'Timing Challenges' });
  await expect(timingTab).toBeVisible();

  await timingTab.click();

  await appFrame.getByRole('button', { name: 'Start Process' }).click();

  const confirmButton = appFrame.getByRole('button', { name: 'Confirm Action' });
  await expect(confirmButton).toBeEnabled();

  await confirmButton.click();
  await expect(appFrame.getByText('Success')).toBeVisible();
});



