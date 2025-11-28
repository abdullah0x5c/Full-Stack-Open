import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /blogs|notes/i })).toBeVisible({ timeout: 3000 })
    // ensure that the login button or form is present
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })
})
