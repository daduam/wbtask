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

  getFirestore()
    .collection("userProfiles")
    .doc(payload.userId)
    .set(payload)
    .then(function (_) {
      res.status(201).send({
        message: "User profile created successfully",
        data: payload,
      });
      return;
    })
    .catch(function (error) {
      res.status(500).send(error);
      return;
    });
}

function updateUserProfile(req, res) {
  if (req.params.userId !== req.user.user_id) {
    res.status(401).send("Unauthorized");
    return;
  }

  const payload = {
    gender: req.body.gender,
    bio: req.body.bio,
    country: req.body.country,
  };

  getFirestore()
    .collection("userProfiles")
    .doc(req.user.user_id)
    .update(payload)
    .then(function (_) {
      res.status(200).send({
        message: "User profile updated successfully",
        data: {
          userId: req.user.user_id,
          displayName: req.user.name,
          email: req.user.email,
          gender: payload.gender,
          bio: payload.bio,
          country: payload.country,
        },
      });
      return;
    })
    .catch(function (error) {
      res.status(500).send(error);
      return;
    });
}

module.exports = {
  createUserProfile,
  updateUserProfile,
};
