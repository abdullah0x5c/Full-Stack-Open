import { test, expect } from '@playwright/test'
import { resetDatabase, createUser } from './helper'

test.describe('Blog app - create blog', () => {
  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await createUser(request, { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' })
    await page.goto('/')
    // login via UI
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page.getByText(/Matti Luukkainen logged in|Successfully Logged In\./i)).toBeVisible()
  })

  test('a new blog can be created', async ({ page }) => {
    const title = 'E2E Blog by Playwright'
    await page.getByRole('button', { name: /Add New Blog/i }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill('Playwright')
    await page.getByLabel('url').fill('http://playwright.test')
    await page.getByRole('button', { name: /Submit/i }).click()

    await expect(page.getByText(title)).toBeVisible()
  })
})
