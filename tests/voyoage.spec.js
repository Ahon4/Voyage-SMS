const { test, expect } = require('@playwright/test');

test('create an account.', async ({ page }) => {
  await page.goto('https://revibe-web-client-voyage-sms-voyagesms.vercel.app/');

  // Generate unique data for each run
  const uniqueId = Date.now(); // Current timestamp
  const uniqueEmail = `example${uniqueId}@example.com`;
  const uniqueFirstName = `John${uniqueId}`;
  const uniqueLastName = `Doe${uniqueId}`;

  // Fill the email field with unique email
  await page.fill('input[type="email"][name="email"]', uniqueEmail);

  // Fill the first name field with unique first name
  await page.fill('input[name="first_name"]', uniqueFirstName);

  // Fill the last name field with unique last name
  await page.fill('input[name="last_name"]', uniqueLastName);

  // Continue with the rest of your form filling and test steps
  await page.fill('input[name="company_name"]', "John's Company");
  await page.fill('input[name="website"]', 'http://www.store.com');
  // ... other actions ...

  await page.click('button[type="submit"]'); // Assuming this is for the initial form submission
  await page.fill('input[name="password"]', "GGG@123"); //best practice to use as env variable
  await page.click('button[type="submit"]'); // If there's another form or action to submit

  await page.click('.flex.items-center.whitespace-nowrap.gap-2:has-text("Skip")');
  await page.click('text=Next');

  const isChecked = await page.isChecked('button[role="checkbox"]');
  if (!isChecked) {
    await page.click('button[role="checkbox"]');
  }

  await page.click('.inline-flex.items-center.justify-center:has-text("Next")');
  await page.waitForTimeout(5000);

  await page.fill('input[placeholder="Shopify Domain"]', 'shop_123');
  await page.click('text=Connect Shopify');

  const message = await page.textContent('h1.tc');
  if (message === "Sorry, this shop is currently unavailable.") {
    console.log('The shop is unavailable.');
  } else {
    console.log('The shop is available.');
  }
});
