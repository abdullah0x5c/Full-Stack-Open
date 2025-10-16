import { test, expect } from '@playwright/test'
import { resetDatabase, createUser } from './helper'

test.describe('Blog app - Login', () => {
  test.beforeEach(async ({ page, request }) => {
    // reset backend database and create a test user
    await resetDatabase(request)
    await createUser(request, {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  test('succeeds with correct credentials', async ({ page }) => {
    await page.getByRole('button', { name: /login/i }).click()
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: /login/i }).click()

    // The app may show either the logged-in username or a success notification.
    // Allow either text to be considered a successful login.
    await expect(page.getByText(/Matti Luukkainen logged in|Successfully Logged In\./i)).toBeVisible({ timeout: 10000 })
  })

  test('fails with wrong credentials', async ({ page }) => {
    await page.getByRole('button', { name: /login/i }).click()
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('wrong')
    await page.getByRole('button', { name: /login/i }).click()

    const errorDiv = page.locator('.error')
    // The app renders "Login Failed." on failed login
    await expect(errorDiv).toContainText('Login Failed.')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })
})
