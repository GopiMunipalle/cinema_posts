import { Request, Response } from "express";
import postsModel from "../models/postsModel";
import commentModel from "../models/commentModel";
import { Communicator } from "../communicator/communicator";
const userModel = new Communicator();

export async function createComment(req: Request, res: Response) {
  try {
    const { postId, comment, userId } = req.body;
    const response = await userModel.getUser(userId);
    if (!response) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const commentDoc = await commentModel.create({
      postId,
      comment,
      userId,
    });
    res.status(201).json({
      status: 201,
      message: "Comment created successfully",
      body: commentDoc,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getComments(req: Request, res: Response) {
  try {
    const { postId, userId } = req.body;
    const comments = await commentModel.find({ postId, userId });
    res.status(200).json({ status: 200, body: comments });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
}

export async function updateComment(req: Request, res: Response) {
  try {
    const { commentId, comment } = req.body;
    const commentDoc = await commentModel.findById(commentId);
    if (!commentDoc) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    commentDoc.comment = comment;
    await commentDoc.save();
    res.status(200).json({ status: 200, body: commentDoc });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
}

export async function deleteComment(req: Request, res: Response) {
  try {
    const { commentId, userId } = req.body;
    const commentDoc = await commentModel.findById(commentId);
    if (!commentDoc) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    await commentModel.deleteOne({ _id: commentId });
    res.status(200).json({ status: 200, body: commentDoc });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
}
