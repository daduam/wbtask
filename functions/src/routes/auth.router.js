const express = require("express");

const { signUpWithEmailAndPassword } = require("../services/auth.service");

const router = express.Router();

router.post("/signup", signUpWithEmailAndPassword);

module.exports = router;
