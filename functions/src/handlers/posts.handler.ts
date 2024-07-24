import { Request, Response } from "express";
import {
  DocumentSnapshot,
  FieldValue,
  getFirestore,
} from "firebase-admin/firestore";

import { BLOG_POSTS_COLLECTION_PATH } from "../constants";

export async function createBlogPost(req: Request, res: Response) {
  const payload = {
    authorId: req.user?.user_id,
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
    createdAt: FieldValue.serverTimestamp(),
  };

  const postsRef = getFirestore().collection(BLOG_POSTS_COLLECTION_PATH);

  try {
    const snapshot = await postsRef.add(payload);
    const doc = await snapshot.get();
    const post = doc.data();
    if (!post) {
      throw Error("Something went wrong!");
    }
    const response = {
      message: "Blog post created successfully.",
      data: { id: doc.id, ...post, createdAt: post.createdAt.toDate() },
    };
    res.status(201).send(response);
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export async function getBlogPostById(req: Request, res: Response) {
  const documentPath = req.params.postId;
  const postsRef = getFirestore().collection(BLOG_POSTS_COLLECTION_PATH);

  try {
    const snapshot = await postsRef.doc(documentPath).get();
    if (!snapshot.exists) {
      res.status(404).send({ message: `Post ${documentPath} not found.` });
      return;
    }
    res.status(200).send(buildPostResponseFromDoc(snapshot));
    return;
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getAllBlogPosts(req: Request, res: Response) {
  const postsRef = getFirestore().collection(BLOG_POSTS_COLLECTION_PATH);

  try {
    const snapshot = await postsRef.get();
    const posts: any[] = [];
    snapshot.forEach(function (doc) {
      posts.push(buildPostResponseFromDoc(doc));
    });
    res.status(200).send(posts);
    return;
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateBlogPost(req: Request, res: Response) {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
  };

  const documentPath = req.params.postId;
  const docRef = getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .doc(documentPath);

  try {
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      res.status(404).send({ message: `Post ${documentPath} not found` });
      return;
    }

    const post = snapshot.data();
    if (post?.authorId !== req.user?.user_id) {
      res.status(401).send("Unauthorized");
      return;
    }

    await docRef.update(payload);
    res.status(200).send({
      message: `Post ${documentPath} updated successfully`,
      data: { ...buildPostResponseFromDoc(snapshot), ...payload },
    });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export async function deleteBlogPost(req: Request, res: Response) {
  const documentPath = req.params.postId;
  const docRef = getFirestore()
    .collection(BLOG_POSTS_COLLECTION_PATH)
    .doc(documentPath);

  try {
    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      res
        .status(200)
        .send({ message: `Post ${documentPath} deleted successfully.` });
      return;
    }

    const post = snapshot.data();
    if (post?.authorId !== req.user?.user_id) {
      res.status(401).send("Unauthorized");
      return;
    }

    await docRef.delete();
    res
      .status(200)
      .send({ message: `Post ${documentPath} deleted successfully.` });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

function buildPostResponseFromDoc(doc: DocumentSnapshot) {
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data()?.createdAt.toDate(),
  };
}
