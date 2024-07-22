import { Request, Response } from "express";
import {
  DocumentSnapshot,
  FieldValue,
  getFirestore,
} from "firebase-admin/firestore";

import { BLOG_POSTS_COLLECTION_PATH } from "../constants";

export function createBlogPost(req: Request, res: Response) {
  const payload = {
    authorId: req.user?.user_id,
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

export function getBlogPostById(req: Request, res: Response) {
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

export function getAllBlogPosts(req: Request, res: Response) {
  getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .get()
    .then(function (snapshot) {
      const posts: any[] = [];
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

export function updateBlogPost(req: Request, res: Response) {
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
      if (post?.authorId != req.user?.user_id) {
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

export function deleteBlogPost(req: Request, res: Response) {
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
      if (post?.authorId != req.user?.user_id) {
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

function buildPostResponseFromDoc(doc: DocumentSnapshot) {
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data()?.createdAt.toDate(),
  };
}
