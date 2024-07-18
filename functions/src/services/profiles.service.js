const { getFirestore } = require("firebase-admin/firestore");

function createUserProfile(req, res) {
  const payload = {
    userId: req.user.user_id,
    displayName: req.user.name,
    email: req.user.email,
    gender: req.body.gender,
    bio: req.body.bio,
    country: req.body.country,
  };

  Object.keys(payload).forEach(function (k) {
    if (payload[k] === undefined || payload[k] == null) delete payload[k];
  });

  getFirestore()
    .collection("userProfiles")
    .doc(payload.userId)
    .set(payload)
    .then(function (_) {
      res.status(201).send(payload);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
}

module.exports = {
  createUserProfile,
};
