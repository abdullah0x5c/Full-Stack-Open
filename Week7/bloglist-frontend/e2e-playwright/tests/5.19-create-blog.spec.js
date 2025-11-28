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
    const userLocator = page.getByText('Matti Luukkainen logged in')
    const noteLocator = page.getByText('Successfully Logged In.')
    const userCount = await userLocator.count()
    const noteCount = await noteLocator.count()
    if (userCount > 0) {
      await expect(userLocator).toBeVisible()
    } else {
      await expect(noteLocator).toBeVisible()
    }
  })

  test('a new blog can be created', async ({ page }) => {
    const title = 'E2E Blog by Playwright'
    await page.getByRole('button', { name: /Add New Blog/i }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill('Playwright')
    await page.getByLabel('url').fill('http://playwright.test')
    await page.getByRole('button', { name: /Submit/i }).click()

    // Notification and blog item may contain the same text; assert that a .blog element contains the title
    const blogItems = page.locator('.blog').filter({ hasText: title })
    const count = await blogItems.count()
    if (count < 1) throw new Error(`expected at least one .blog with title ${title}, found ${count}`)
    // ensure at least one of the matched items has a view button
    const firstWithButton = blogItems.filter({ has: page.getByRole('button', { name: /view/i }) }).first()
    await expect(firstWithButton).toBeVisible()
  })
})
