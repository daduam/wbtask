/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export function validateRequestBody(schema: ZodType) {
  // eslint-disable-next-line space-before-function-paren
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send({
          message: "One or more fields were invalid.",
          errors: error.formErrors.fieldErrors,
        });
        return;
      }

      res.status(500).send({ error: "Internal Server Error" });
    }
  };
}
