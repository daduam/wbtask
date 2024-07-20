import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export function validateRequestBody(schema: ZodType) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error);
      }

      res.status(500).send({ error: "Internal Server Error" });
    }
  };
}
