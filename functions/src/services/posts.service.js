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

function updateBlogPost(req, res) {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
  };

  const documentPath = req.params.postId;
  const docRef = getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .doc(documentPath);

  getFirestore()
    .runTransaction(function (tx) {
      return tx.get(docRef).then(function (doc) {
        if (!doc.exists) {
          throw {
            message: `Post ${documentPath} not found`,
            statusCode: 404,
          };
        }

        const post = doc.data();
        if (post.authorId != req.user.user_id) {
          throw { message: "Unauthorized", statusCode: 401 };
        }

        tx.update(docRef, payload);

        return post;
      });
    })
    .then(function (post) {
      res.status(200).send({
        message: `Post ${documentPath} updated successfully`,
        data: { id: documentPath, ...post, ...payload },
      });
      return;
    })
    .catch(function (error) {
      if (error.message && error.statusCode) {
        res.status(error.statusCode).send({ message: error.message });
        return;
      }

      res.status(500).send(error);
      return;
    });
}

module.exports = { createBlogPost, getBlogPostById, updateBlogPost };
