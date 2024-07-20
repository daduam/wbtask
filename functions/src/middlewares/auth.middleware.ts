import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export function validateFirebaseIdToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (!authorization.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return;
  }

  const idToken = authorization.split("Bearer ")[1];
  getAuth()
    .verifyIdToken(idToken)
    .then(function (decodedIdToken) {
      req.user = decodedIdToken;
      next();
      return;
    })
    .catch(function (_error) {
      res.status(401).send("Unauthorized");
      return;
    });
}
