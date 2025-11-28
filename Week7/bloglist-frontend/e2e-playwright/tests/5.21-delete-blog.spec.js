import { test, expect } from '@playwright/test'
import { resetDatabase, createUser } from './helper'

test.describe('Blog app - deletion', () => {
  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await createUser(request, { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' })
    await page.goto('/')
    // login
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: /login/i }).click()
    // create a blog
    await page.getByRole('button', { name: /Add New Blog/i }).click()
    await page.getByLabel('title').fill('Deletable Blog')
    await page.getByLabel('author').fill('Author')
    await page.getByLabel('url').fill('http://delete.test')
    await page.getByRole('button', { name: /Submit/i }).click()
    await expect(page.locator('.blog').filter({ hasText: 'Deletable Blog' }).first()).toBeVisible()
  })

  test('creator can delete the blog', async ({ page }) => {
    const blog = page.locator('.blog').filter({ hasText: 'Deletable Blog' }).first()
    await blog.getByRole('button', { name: /view/i }).click()

    // intercept the native confirm and automatically confirm
    page.on('dialog', async dialog => {
      if (dialog.type() === 'confirm') await dialog.accept()
      else await dialog.dismiss()
    })

    await blog.getByRole('button', { name: /remove/i }).click()

    // blog should no longer be present
    await expect(page.locator('.blog').filter({ hasText: 'Deletable Blog' }).first()).toHaveCount(0)
  })
})
