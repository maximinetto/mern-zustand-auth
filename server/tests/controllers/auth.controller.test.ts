import request from "supertest";
import app from "../../app";
import {
  type ErrorResponse,
  type OkResponse,
} from "../../controllers/auth.controller";
import { User } from "../../models";
import assertDefined from "../utils/assertDefined";

async function createADefaultUser(): Promise<{
  status: number;
  body: OkResponse;
  userInfo: {
    email: string | null;
    password: string | null;
  };
}> {
  const userInfo = {
    email: "maximinetto@hello.com",
    password: "12345678",
  };

  await User.create(userInfo);

  const params: string[] = Object.values(userInfo);
  return await getToken<OkResponse>(...params);
}

async function getToken<T extends OkResponse | ErrorResponse>(
  email?: string | null,
  password?: string | null
): Promise<{
  status: number;
  body: T;
  userInfo: {
    email: string | null;
    password: string | null;
  };
}> {
  const userInfo = {
    email: typeof email !== "undefined" ? email : "maximinetto@hello.com",
    password: typeof password !== "undefined" ? password : "12345678",
  };

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
    const { body, status } = await createADefaultUser();

    expect(status).toBe(200);
    expect(body).toHaveProperty(["token"]);
    expect(body.token).toBeTypeOf("string");
  });

  it("should not login and return a 401 status code with the apropiate message", async () => {
    const { status, body } = await getToken<OkResponse>();

    expect(status).toBe(401);
    expect(body).toEqual({ message: "Invalid email and password" });
  });

  it("should return a 400 status code when email and password are not defined", async () => {
    const { status, body } = await getToken<ErrorResponse>(null, null);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      message: "You must be provide a valid email and password",
    });
    expect(body).toHaveProperty("reason");
    expect(body.reason).toEqual([
      {
        code: "invalid_type",
        expected: "string",
        received: "null",
        path: ["body", "email"],
        message: "Expected string, received null",
      },
      {
        code: "invalid_type",
        expected: "string",
        received: "null",
        path: ["body", "password"],
        message: "Expected string, received null",
      },
    ]);
  });

  it("should return a 400 status code when email or password are not defined", async () => {
    async function passwordNotProvided(): Promise<void> {
      const { status, body } = await getToken<ErrorResponse>(
        "maximinetto@gmail.com",
        null
      );

      expect(status).toBe(400);
      expect(body).toMatchObject({
        message: "You must be provide a valid email and password",
      });
      expect(body).toHaveProperty("reason");
      expect(body.reason).toEqual([
        {
          code: "invalid_type",
          expected: "string",
          received: "null",
          path: ["body", "password"],
          message: "Expected string, received null",
        },
      ]);
    }

    async function emailNotProvided(): Promise<void> {
      const { status, body } = await getToken<ErrorResponse>(null, "12345678");

      expect(status).toBe(400);
      expect(body).toMatchObject({
        message: "You must be provide a valid email and password",
      });
      expect(body).toHaveProperty("reason");
      expect(body.reason).toEqual([
        {
          code: "invalid_type",
          expected: "string",
          received: "null",
          path: ["body", "email"],
          message: "Expected string, received null",
        },
      ]);
    }

    await passwordNotProvided();
    await emailNotProvided();
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
    } = await createADefaultUser();

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
