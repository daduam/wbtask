const express = require("express");
const functions = require("firebase-functions");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("express + firebase");
});

exports.api = functions.https.onRequest(app);
