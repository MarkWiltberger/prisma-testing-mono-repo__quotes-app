import { test, expect } from './fixtures/auth.fixture'

test.describe('auth', () => {
  // Your tests will go here
  test('should redirect unauthorized user to the login page', async ({
    page
  }) => {
    await page.goto('http://localhost:5173/')
    await expect(page).toHaveURL('http://localhost:5173/login')
  })
})
