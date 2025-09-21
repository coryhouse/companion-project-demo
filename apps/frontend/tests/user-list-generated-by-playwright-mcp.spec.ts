import { test, expect } from "@playwright/test";

test.describe("User List", () => {
  test("displays list of users or no users message", async ({ page }) => {
    // Navigate to homepage
    await page.goto("http://localhost:3000");

    // Verify main heading
    const mainHeading = page.getByRole("heading", {
      name: "Pet Insurance Users",
      level: 1,
    });
    await expect(mainHeading).toBeVisible();

    // Verify users section heading
    const usersHeading = page.getByRole("heading", { name: "Users", level: 2 });
    await expect(usersHeading).toBeVisible();

    // Check for either user list or no users message
    const noUsersMessage = page.getByText("No users found");
    const userItems = page.getByRole("listitem");

    // Assert that we either see the no users message or we see user list items
    if (await noUsersMessage.isVisible()) {
      await expect(noUsersMessage).toBeVisible();
    } else {
      const expectedUsers = [
        "john_doe",
        "jane_smith",
        "bob_johnson",
        "alice_brown",
        "charlie_davis",
      ];

      // Check number of users
      await expect(userItems).toHaveCount(expectedUsers.length);

      // Verify each user is present
      for (const username of expectedUsers) {
        await expect(
          page.getByRole("listitem", { hasText: username })
        ).toBeVisible();
      }
    }
  });
});
