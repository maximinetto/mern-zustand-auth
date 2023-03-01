import { test } from "@playwright/test";

const HOST = process.env.VITE_HOST_SERVER ?? "http://localhost:3001";

test.beforeEach(async ({ request, baseURL }) => {
  let response = await request.post(`${HOST}/testing/reset`);
  if (!response.ok())
    throw new Error("Something went wrong with the API when cleaning the data");

  const user = {
    email: "maximinetto@gmail.com",
    password: "1234",
  };

  response = await request.post(`${HOST}/register`, {
    data: user,
  });

  if (!response.ok())
    throw new Error("Something went wrong with the API when creating a user");
});
