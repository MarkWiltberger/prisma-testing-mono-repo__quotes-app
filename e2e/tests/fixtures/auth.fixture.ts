// e2e/tests/fixtures/auth.fixture.ts
import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import prisma from '../helpers/prisma'
import { faker } from '@faker-js/faker'
import { LocalStorage } from '../helpers/LocalStorage'

type UserDetails = {
  username: string
  password: string
}

type AuthFixtures = {
  loginpage: LoginPage
  user_credentials: UserDetails
  account: UserDetails
  storage: LocalStorage
}

export const test = base.extend<AuthFixtures>({
  loginpage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  },

  user_credentials: async ({}, use) => {
    const username = faker.internet.userName()
    const password = faker.internet.password()

    await use({
      username,
      password
    })

    await prisma.user.deleteMany({ where: { username } })
  },

  account: async ({ browser, user_credentials }, use) => {
    // Create a new tab in the test's browser
    const page = await browser.newPage()
    // Navigate to the login page
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    // Fill in and submit the sign-up form
    await loginPage.populateForm(
      user_credentials.username,
      user_credentials.password
    )
    await page.click('#signup')
    await page.waitForLoadState('networkidle')
    // Close the tab
    await page.close()
    // Provide credentials to the test
    await use(user_credentials)
  },

  storage: async ({ page }, use) => {
    const storage = new LocalStorage(page.context())
    await use(storage)
  }
})

export { expect } from '@playwright/test'
