import {
  HttpResponse,
  expect,
  http,
  passthrough,
  test,
} from "next/experimental/testmode/playwright/msw";

test.describe("User List Feature", () => {
  test("should display a list of usernames from the API", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Wait for the page to load and check the title
    await expect(page).toHaveTitle(/Pet Insurance App/);

    // Check that the main heading is visible
    await expect(
      page.getByRole("heading", { name: "Pet Insurance Users", level: 1 })
    ).toBeVisible();

    // Check that the Users section heading is visible
    await expect(
      page.getByRole("heading", { name: "Users", level: 2 })
    ).toBeVisible();

    // Wait for the user list to be visible
    const userList = page.getByRole("list", { name: "List of users" });
    await expect(userList).toBeVisible();

    // Check that the expected users are displayed
    const expectedUsers = [
      "john_doe",
      "jane_smith",
      "bob_johnson",
      "alice_brown",
      "charlie_davis",
    ];

    for (const username of expectedUsers) {
      await expect(page.getByText(username)).toBeVisible();
    }

    // Check that we have the correct number of user items
    const userItems = userList.getByRole("listitem");
    await expect(userItems).toHaveCount(5);

    // Verify each username appears in the list
    for (const username of expectedUsers) {
      const userItem = userItems.filter({ hasText: username });
      await expect(userItem).toBeVisible();
    }
  });

  test("should handle empty user list gracefully", async ({ page }) => {
    // Mock an empty response
    await page.route("http://localhost:3001/users", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await page.goto("/");

    // Check that the "No users found" status message is displayed
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByRole("status")).toHaveText("No users found");

    // Ensure the user list is not present when empty
    const userList = page.getByRole("list", { name: "List of users" });
    await expect(userList).not.toBeVisible();

    // Verify the Users heading is still present
    await expect(
      page.getByRole("heading", { name: "Users", level: 2 })
    ).toBeVisible();
  });

  test.only("should handle API errors gracefully", async ({ page }) => {
    // Mock a failed response
    await page.route("http://localhost:3001/users", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("/");

    // The page should still load, but with no users (empty array fallback)
    await expect(
      page.getByRole("heading", { name: "Pet Insurance Users", level: 1 })
    ).toBeVisible();
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByRole("status")).toHaveText("No users found");

    // Ensure no user list is displayed
    const userList = page.getByRole("list", { name: "List of users" });
    await expect(userList).not.toBeVisible();
  });

  test("should have proper semantic structure and accessibility", async ({
    page,
  }) => {
    await page.goto("/");

    // Check that the page has proper semantic structure
    await expect(page.getByRole("main")).toBeVisible();

    // Check that the users section has proper labeling
    const usersSection = page.getByRole("region", { name: "Users" });
    await expect(usersSection).toBeVisible();

    // Check that the heading is properly connected to the section
    await expect(
      page.getByRole("heading", { name: "Users", level: 2 })
    ).toBeVisible();

    // Verify the user list has proper ARIA attributes
    const userList = page.getByRole("list", { name: "List of users" });
    await expect(userList).toBeVisible();

    // Check that list items are properly identified
    const listItems = userList.getByRole("listitem");
    await expect(listItems).toHaveCount(5);
  });
});
