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

module.exports = {
  signUpWithEmailAndPassword,
};
