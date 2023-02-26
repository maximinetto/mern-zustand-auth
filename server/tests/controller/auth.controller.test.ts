import request from "supertest";
import app from "../../app";

async function getToken(): Promise<{
  status: number;
  body: { token: string };
}> {
  const response = await request(app).post("/login").send({
    email: "maximinetto@hello.com",
    password: "12345678",
  });

  const { status, body } = response;
  return {
    status,
    body,
  };
}

describe("Auth controller", () => {
  it("should login and return a token", async () => {
    const { status, body } = await getToken();

    expect(status).toBe(200);
    expect(body).toHaveProperty(["token"]);
    expect(body.token).toBeTypeOf("string");
  });

  it("should not get the profile and return a 401 status code", async () => {
    const response = await request(app).get("/profile").send();
    const { status, body } = response;

    expect(status).toBe(401);
    expect(body).toEqual({
      message: "Unauthorized",
    });
  });

  it("should get the profile and return a 200 status code", async () => {
    const {
      body: { token },
    } = await getToken();

    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const { status, body } = response;
    const { profile } = body;

    expect(status).toBe(200);
    expect(body).toMatchObject({
      message: "profile data",
    });
    expect(profile).toHaveProperty(["test"]);
    expect(profile).toHaveProperty(["iat"]);
    expect(profile).toHaveProperty(["exp"]);
    expect(profile.test).toEqual("test");
    expect(profile.iat).toBeTypeOf("number");
    expect(profile.exp).toBeTypeOf("number");
  });
});
