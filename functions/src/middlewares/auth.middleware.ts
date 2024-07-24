import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export async function validateFirebaseIdToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return;
  }

  const idToken = authorization.split("Bearer ")[1];

  try {
    const decodedIdToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
    return;
  }
}
