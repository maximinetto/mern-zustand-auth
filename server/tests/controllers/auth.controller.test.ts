import request from "supertest";
import app from "../../app";
import { User } from "../../models";
import assertDefined from "../utils/assertDefined";

async function getToken(): Promise<{
  status: number;
  body: { token: string };
  userInfo: {
    email: string;
    password: string;
  };
}> {
  const userInfo = { email: "maximinetto@hello.com", password: "12345678" };

  const response = await request(app).post("/login").send(userInfo);

  const { status, body } = response;
  return {
    status,
    body,
    userInfo,
  };
}

describe("Auth controller", () => {
  it("should login and return a token", async () => {
    const { status, body } = await getToken();

    expect(status).toBe(200);
    expect(body).toHaveProperty(["token"]);
    expect(body.token).toBeTypeOf("string");
  });

  it("should create a new user with a successful message", async () => {
    const userInfo = { email: "maximinetto@hello.com", password: "12345678" };
    const response = await request(app).post("/register").send(userInfo);
    const { body, status } = response;
    const user = await User.findOne({ email: userInfo.email });

    expect(status).toBe(201);
    expect(body).toEqual({ message: "User registered" });
    assertDefined(user);
    expect(user.email).toBe(userInfo.email);
  });

  it("should not register a user with a duplicate email", async () => {
    const userInfo = { email: "maximinetto@hello.com", password: "12345678" };
    await User.create({ ...userInfo, password: "1234" });
    const response = await request(app).post("/register").send(userInfo);
    const { body, status } = response;
    const user = await User.findOne({ email: userInfo.email });

    expect(status).toBe(409);
    expect(body).toEqual({
      message: "User already exists",
    });

    assertDefined(user);
    expect(user.email).toBe(userInfo.email);
    expect(user.password).not.toBe(userInfo.password);
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
