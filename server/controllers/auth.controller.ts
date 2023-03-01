import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

export interface OkResponse {
  token: string;
}
export interface ErrorResponse {
  message: string;
  reason: any[];
}

export const registerHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  async function handler(): Promise<
    Response<any, Record<string, any>> | undefined
  > {
    const { email, password } = req.body;

    await User.create({ email, password });

    return res.status(201).json({
      message: "User registered",
    });
  }

  handler().catch((err) => {
    console.error(err);
    if (err.message.indexOf("11000") !== -1)
      return res.status(409).json({ message: "User already exists" });

    next(err);
  });
};

export const loginHandler = (
  req: Request<unknown, unknown, { email: string; password: string }>,
  res: Response,
  next: NextFunction
): void => {
  async function handler(): Promise<
    Response<OkResponse | ErrorResponse, Record<string, any>>
  > {
    const { email, password } = req.body;
    // get user from database
    const user = await User.findOne({
      email,
    });
    // compare passwords
    const matches = password === user?.password; // improve later
    if (!matches)
      return res.status(401).json({ message: "Invalid email and password" });
    // generate a jwt

    const token = jwt.sign(
      {
        test: "test",
      },
      "secret",
      {
        expiresIn: "15m",
      }
    );
    return res.json({
      token,
    });
  }

  handler().catch((err) => {
    console.error(err);
    next(err);
  });
};

export const profileHandler = (
  req: Request,
  res: Response<unknown, { decodedToken: string }>
): Response<
  unknown,
  {
    decodedToken: string;
  }
> => {
  const { decodedToken } = res.locals;

  return res.json({ message: "profile data", profile: decodedToken });
};

export const handlerReset = (
  req: Request,
  res: Response<unknown, { decodedToken: string }>
): void => {
  async function handler(): Promise<void> {
    await User.deleteMany({});
    res.status(204).end();
  }

  void handler();
};
