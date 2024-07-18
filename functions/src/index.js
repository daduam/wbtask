require("dotenv").config();

const cors = require("cors");
const express = require("express");
const functions = require("firebase-functions");
const { initializeApp, applicationDefault } = require("firebase-admin/app");

const authRouter = require("./routes/auth.router");
const profilesRouter = require("./routes/profiles.router");

initializeApp({
  credential: applicationDefault(),
});

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true }));

app.use("/auth", authRouter);
app.use("/profiles", profilesRouter);

exports.api = functions.https.onRequest(app);
