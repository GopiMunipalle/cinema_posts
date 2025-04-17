import { Request, Response } from "express";
import postsModel from "../models/postsModel";
import commentModel from "../models/commentModel";
import { Communicator } from "../communicator/communicator";
const userModel = new Communicator();

export async function createPost(req: Request, res: Response) {
  try {
    const { userId, title, message, tags, images } = req.body;
    const response = await userModel.getUser(userId);
    if (!response) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const postDoc = await postsModel.create({
      userId,
      title,
      message,
      creator: response?.email,
      tags,
      images,
      likeCount: 0,
      cart: [],
    });
    res.status(201).json({
      status: 201,
      message: "Post created successfully",
      body: postDoc,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await userModel.getUser(Number(userId));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const posts = await postsModel.find({ userId });
    res.status(200).json({ status: 200, body: posts });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const postId = req.params.id;
    const post = await postsModel.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json({ status: 200, body: post });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
}

export async function removePosts(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const { postIds } = req.body;
    const user = await userModel.getUser(Number(userId));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const posts = await postsModel.find({ userId, _id: { $nin: postIds } });
    if (posts.length === 0) {
      res.status(404).json({ message: "Posts not found" });
      return;
    }

    res.status(200).json({ status: 200, body: posts });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
}
