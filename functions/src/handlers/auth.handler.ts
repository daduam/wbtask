import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export async function signUpWithEmailAndPassword(req: Request, res: Response) {
  const payload = {
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.displayName,
  };

  try {
    const userRecord = await getAuth().createUser(payload);

    res.status(201).send({
      id: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function logInWithEmailAndPassword(req: Request, res: Response) {
  const identityToolkitEndpoint = process.env.IDENTITY_TOOLKIT_BASE_URL;
  const apiKey = process.env.WEB_API_KEY;

  const endpoint = `${identityToolkitEndpoint}:signInWithPassword?key=${apiKey}`;
  const payload = {
    email: req.body.email,
    password: req.body.password,
    returnSecureToken: true,
  };

  try {
    const { data } = await axios.post(endpoint, payload);
    res.status(200).send(data);
    return;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      res.status(error.response.status).send(error.response.data);
      return;
    }
    res.status(500).send(error);
  }
}
