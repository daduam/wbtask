import * as dotenv from "dotenv";

dotenv.config();

import * as cors from "cors";
import * as express from "express";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import * as functions from "firebase-functions";

import authRouter from "./routes/auth.router";
import postsRouter from "./routes/posts.router";
import profilesRouter from "./routes/profiles.router";

initializeApp({
  credential: applicationDefault(),
});

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true }));

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/profiles", profilesRouter);

exports.api = functions.https.onRequest(app);
