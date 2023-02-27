import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const registerHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  async function handler(): Promise<
    Response<any, Record<string, any>> | undefined
  > {
    const { email, password } = req.body;
    const userExists = await User.exists({
      email,
    });
    if (userExists != null)
      return res.status(409).json({ message: "User already exists" });

    await User.create({ email, password });

    return res.status(201).json({
      message: "User registered",
    });
  }

  handler().catch((err) => {
    next(err);
  });
};

export const loginHandler = (
  req: Request,
  res: Response
): Response<any, Record<string, any>> => {
  // get request body
  // validate the data
  // store in database
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
