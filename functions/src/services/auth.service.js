const axios = require("axios");
const { getAuth } = require("firebase-admin/auth");

function signUpWithEmailAndPassword(req, res) {
  getAuth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    })
    .then((userRecord) => {
      res.status(201).send({
        id: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}

function logInWithEmailAndPassword(req, res) {
  const identityToolkitEndpoint = process.env.IDENTITY_TOOLKIT_BASE_URL;
  const apiKey = process.env.WEB_API_KEY;

  const endpoint = `${identityToolkitEndpoint}:signInWithPassword?key=${apiKey}`;
  const payload = {
    email: req.body.email,
    password: req.body.password,
    returnSecureToken: true,
  };

  axios
    .post(endpoint, payload)
    .then(function (response) {
      return res.status(200).send(response.data);
    })
    .catch(function (error) {
      if (error instanceof axios.AxiosError && error.response) {
        return res.status(error.response.status).send(error.response.data);
      }

      return res.status(500).send(error);
    });
}

module.exports = {
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
};
