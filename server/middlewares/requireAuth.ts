import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined => {
  const { authorization } = req.headers;

  const unauthorized = (): Response<any, Record<string, any>> =>
    res.status(401).json({
      message: "Unauthorized",
    });

  if (authorization == null) return unauthorized();

  const token = authorization.split(" ")[1];

  if (token == null) return unauthorized();

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
