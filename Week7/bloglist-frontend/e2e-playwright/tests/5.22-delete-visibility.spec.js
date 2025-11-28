import { test, expect } from '@playwright/test'
import { resetDatabase, createUser } from './helper'

// Test that only the user who created the blog sees the delete button

test.describe('Blog app - delete visibility', () => {
  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    // create two users
    await createUser(request, { name: 'Creator', username: 'creator', password: 'pass' })
    await createUser(request, { name: 'Other', username: 'other', password: 'pass' })

    await page.goto('/')
    // login as creator and create a blog
    await page.getByLabel('username').fill('creator')
    await page.getByLabel('password').fill('pass')
    await page.getByRole('button', { name: /login/i }).click()
    await page.getByRole('button', { name: /Add New Blog/i }).click()
    await page.getByLabel('title').fill('Creator Blog')
    await page.getByLabel('author').fill('Creator')
    await page.getByLabel('url').fill('http://creator.test')
    await page.getByRole('button', { name: /Submit/i }).click()
    await expect(page.locator('.blog').filter({ hasText: 'Creator Blog' }).first()).toBeVisible()

    // logout
    await page.getByRole('button', { name: /logout/i }).click()
  })

  test('only creator sees remove button', async ({ page }) => {
    // login as other user
    await page.getByLabel('username').fill('other')
    await page.getByLabel('password').fill('pass')
    await page.getByRole('button', { name: /login/i }).click()

    const blog = page.locator('.blog').filter({ hasText: 'Creator Blog' }).first()
    await blog.getByRole('button', { name: /view/i }).click()
    // other user should not see remove button
    await expect(blog.getByRole('button', { name: /remove/i })).toHaveCount(0)

    // logout and login as creator
    await page.getByRole('button', { name: /logout/i }).click()
    await page.getByLabel('username').fill('creator')
    await page.getByLabel('password').fill('pass')
    await page.getByRole('button', { name: /login/i }).click()

    const blog2 = page.locator('.blog').filter({ hasText: 'Creator Blog' }).first()
    await blog2.getByRole('button', { name: /view/i }).click()
    await expect(blog2.getByRole('button', { name: /remove/i })).toHaveCount(1)
  })
})
