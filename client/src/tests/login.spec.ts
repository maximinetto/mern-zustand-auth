import { expect, test } from "@playwright/test";
import "./setupUser.ts";

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
      .type("maximinetto@gmail.com");
    await page
      .getByRole("textbox", {
        name: "password",
      })
      .type("1234");

    await page.keyboard.press("Enter");
    const url = baseURL ?? "http://localhost:5173/";
    await expect(page).toHaveURL(url);
  });
});
