import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const unauthorized = () =>
    res.status(401).json({
      message: "Unauthorized",
    });

  if (!authorization) return unauthorized();

  const token = authorization.split(" ")[1];

  if (!token) unauthorized();

  try {
    const decodedToken = jwt.verify(token, "secret");
    res.locals = { decodedToken };
    next();
  } catch (error) {
    console.error(error);
    return unauthorized();
  }
};

export default requireAuth;
