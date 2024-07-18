const { getFirestore } = require("firebase-admin/firestore");

const {
  USER_PROFILE_COLLECTION_PATH,
} = require("../constants/profile.constants");

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
    .collection(USER_PROFILE_COLLECTION_PATH)
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
    .collection(USER_PROFILE_COLLECTION_PATH)
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

function getUserProfile(req, res) {
  const documentPath = req.params.userId;

  getFirestore()
    .collection(USER_PROFILE_COLLECTION_PATH)
    .doc(documentPath)
    .get()
    .then(function (doc) {
      if (!doc.exists) {
        res
          .status(404)
          .send({ message: `User profile ${documentPath} not found.` });
        return;
      }

      res.status(200).send(doc.data());
      return;
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
}

function deleteUserProfile(req, res) {
  if (req.params.userId !== req.user.user_id) {
    res.status(401).send("Unauthorized");
    return;
  }

  const documentPath = req.params.userId;

  getFirestore()
    .collection(USER_PROFILE_COLLECTION_PATH)
    .doc(documentPath)
    .delete()
    .then(function (_) {
      res.status(200).send({
        message: `User profile ${documentPath} removed successfully.`,
      });
      return;
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
}

module.exports = {
  createUserProfile,
  updateUserProfile,
  getUserProfile,
  deleteUserProfile,
};
