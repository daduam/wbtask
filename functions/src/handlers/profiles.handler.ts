import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

import { USER_PROFILE_COLLECTION_PATH } from "../constants";

export async function createUserProfile(req: Request, res: Response) {
  const payload = {
    userId: req.user?.user_id,
    displayName: req.user?.name,
    email: req.user?.email,
    gender: req.body.gender,
    bio: req.body.bio,
    country: req.body.country,
  };

  const profilesRef = getFirestore().collection(USER_PROFILE_COLLECTION_PATH);

  try {
    await profilesRef.doc(payload.userId).set(payload);
    res.status(201).send({
      message: "User profile created successfully",
      data: payload,
    });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export async function updateUserProfile(req: Request, res: Response) {
  if (req.params.userId !== req.user?.user_id) {
    res.status(401).send("Unauthorized");
    return;
  }

  const payload = {
    gender: req.body.gender,
    bio: req.body.bio,
    country: req.body.country,
  };

  const profilesRef = getFirestore().collection(USER_PROFILE_COLLECTION_PATH);

  try {
    await profilesRef.doc(req.user.user_id).update(payload);
    res.status(200).send({
      message: "User profile updated successfully",
      data: {
        userId: req.user?.user_id,
        displayName: req.user?.name,
        email: req.user?.email,
        gender: payload.gender,
        bio: payload.bio,
        country: payload.country,
      },
    });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export async function getUserProfile(req: Request, res: Response) {
  const documentPath = req.params.userId;
  const profilesRef = getFirestore().collection(USER_PROFILE_COLLECTION_PATH);

  try {
    const snapshot = await profilesRef.doc(documentPath).get();
    if (!snapshot.exists) {
      res
        .status(404)
        .send({ message: `User profile ${documentPath} not found.` });
      return;
    }
    res.status(200).send(snapshot.data());
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export async function deleteUserProfile(req: Request, res: Response) {
  if (req.params.userId !== req.user?.user_id) {
    res.status(401).send("Unauthorized");
    return;
  }

  const documentPath = req.params.userId;
  const profilesRef = getFirestore().collection(USER_PROFILE_COLLECTION_PATH);

  try {
    await profilesRef.doc(documentPath).delete();
    res.status(200).send({
      message: `User profile ${documentPath} removed successfully.`,
    });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}
