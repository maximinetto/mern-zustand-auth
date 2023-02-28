import { expect, test } from "@playwright/test";

test.describe("Login page", () => {
  test("Expect to login in the application", async ({ page, baseURL }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/login/);

    // Wait for the page to load
    await page.waitForLoadState("networkidle");
    await page
      .getByRole("textbox", {
        name: "email",
      })
      .type("maximinetto@hello.com");
    await page
      .getByRole("textbox", {
        name: "password",
      })
      .type("12345678");

    await page.keyboard.press("Enter");
    const url = baseURL ?? "http://localhost:5173/";
    await expect(page).toHaveURL(url);
  });
});
