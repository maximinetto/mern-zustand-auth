import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject, messageError: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    schema
      .parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.warn("Validation error: ", { error });
        res.status(400).json({
          message: messageError,
          reason: error.issues,
        });
      });
  };

export default validate;
