import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginHandler = (req: Request, res: Response) => {
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
  res: Response<{}, { decodedToken: string }>
) => {
  const { decodedToken } = res.locals;

  return res.json({ message: "profile data", profile: decodedToken });
};
