import { test, expect } from '@playwright/test'
import { resetDatabase, createUser } from './helper'

test.describe('Blog app - liking', () => {
  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await createUser(request, { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' })
    await page.goto('/')
    // login
    await page.getByLabel('username').fill('mluukkai')
    await page.getByLabel('password').fill('salainen')
    await page.getByRole('button', { name: /login/i }).click()
    const userLocator = page.getByText('Matti Luukkainen logged in')
    const noteLocator = page.getByText('Successfully Logged In.')
    if ((await userLocator.count()) > 0) await expect(userLocator).toBeVisible()
    else await expect(noteLocator).toBeVisible()

    // create a blog via UI
    await page.getByRole('button', { name: /Add New Blog/i }).click()
    await page.getByLabel('title').fill('Likeable Blog')
    await page.getByLabel('author').fill('Author')
    await page.getByLabel('url').fill('http://like.test')
    await page.getByRole('button', { name: /Submit/i }).click()
    // ensure created
    await expect(page.locator('.blog').filter({ hasText: 'Likeable Blog' }).first()).toBeVisible()
  })

  test('a blog can be liked', async ({ page }) => {
    const blog = page.locator('.blog').filter({ hasText: 'Likeable Blog' }).first()
    await blog.getByRole('button', { name: /view/i }).click()
    const likeBtn = blog.getByRole('button', { name: /Like/i })
    const likesText = blog.getByText(/likes \d+/i)
    const before = await likesText.textContent()
    await likeBtn.click()
    // after click, like count should increment
    await expect(blog.getByText(/likes \d+/i)).not.toHaveText(before)
  })
})
