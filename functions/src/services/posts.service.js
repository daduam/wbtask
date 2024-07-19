const { getFirestore } = require("firebase-admin/firestore");

const { BLOG_POSTS_COLLECTION_PATH } = require("../constants");

function createBlogPost(req, res) {
  const payload = {
    authorId: req.user.user_id,
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
  };

  getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .add(payload)
    .then(function (doc) {
      res.status(201).send({
        message: "Blog post created successfully.",
        data: { id: doc.id, ...payload },
      });
      return;
    })
    .catch(function (error) {
      res.status(500).send(error);
      return;
    });
}

function getBlogPostById(req, res) {
  const documentPath = req.params.postId;

  getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .doc(documentPath)
    .get()
    .then(function (doc) {
      if (!doc.exists) {
        res.status(404).send({ message: `Post ${documentPath} not found.` });
        return;
      }

      res.status(200).send({ id: doc.id, ...doc.data() });
      return;
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
}

module.exports = { createBlogPost, getBlogPostById };
