const { getFirestore, FieldValue } = require("firebase-admin/firestore");

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
    .add({ ...payload, createdAt: FieldValue.serverTimestamp() })
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

      res.status(200).send(buildPostResponseFromDoc(doc));
      return;
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
}

function getAllBlogPosts(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const after = req.query.after;

  getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .get()
    .then(function (snapshot) {
      const posts = [];
      snapshot.forEach(function (doc) {
        posts.push(buildPostResponseFromDoc(doc));
      });
      res.status(200).send(posts);
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

  docRef
    .get()
    .then(function (doc) {
      if (!doc.exists) {
        res.status(404).send({ message: `Post ${documentPath} not found` });
        return;
      }

      const post = doc.data();
      if (post.authorId != req.user.user_id) {
        res.status(401).send("Unauthorized");
        return;
      }

      docRef.update(payload).then(function (_) {
        res.status(200).send({
          message: `Post ${documentPath} updated successfully`,
          data: { ...buildPostResponseFromDoc(doc), ...payload },
        });
        return;
      });
    })
    .catch(function (error) {
      res.status(500).send(error);
      return;
    });
}

function deleteBlogPost(req, res) {
  const documentPath = req.params.postId;
  const docRef = getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .doc(documentPath);

  docRef
    .get()
    .then(function (doc) {
      if (!doc.exists) {
        res
          .status(200)
          .send({ message: `Post ${documentPath} deleted successfully.` });
        return;
      }

      const post = doc.data();
      if (post.authorId != req.user.user_id) {
        res.status(401).send("Unauthorized");
        return;
      }

      docRef.delete().then(function (_) {
        res
          .status(200)
          .send({ message: `Post ${documentPath} deleted successfully.` });
        return;
      });
    })
    .catch(function (error) {
      res.status(500).send(error);
      return;
    });
}

function buildPostResponseFromDoc(doc) {
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  };
}

module.exports = {
  createBlogPost,
  getBlogPostById,
  getAllBlogPosts,
  updateBlogPost,
  deleteBlogPost,
};
