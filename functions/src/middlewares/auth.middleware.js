const { getAuth } = require("firebase-admin/auth");

function validateFirebaseIdToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return;
  }

  let idToken;
  if (authorization && authorization.startsWith("Bearer ")) {
    idToken = authorization.split("Bearer ")[1];
  } else {
    res.status(401).send("Unauthorized");
    return;
  }

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

module.exports = {
  validateFirebaseIdToken,
};
