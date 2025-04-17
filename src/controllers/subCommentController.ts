import { Request, Response } from "express";
import postsModel from "../models/postsModel";
import { Communicator } from "../communicator/communicator";
import commentModel from "../models/commentModel";
import subCommentModel from "../models/subCommentModel";
const userModel = new Communicator();

export async function createSubComment(req: Request, res: Response) {
  try {
    const { postId, commentId, subComment, userId, parentSubCommentId } =
      req.body;

    const response = await userModel.getUser(userId);
    if (!response) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const postDoc = await postsModel.findById(postId);
    if (!postDoc) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const commentDoc = await commentModel.findOne({ _id: commentId });
    if (!commentDoc) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    let depth = 0;
    if (parentSubCommentId) {
      const parent = await subCommentModel.findById(parentSubCommentId);
      if (!parent) {
        res.status(404).json({ message: "Parent subcomment not found" });
        return;
      }
      depth = parent.depth + 1;
    }

    const subCommentDoc = await subCommentModel.create({
      commentId,
      subComment,
      userId,
      depth: parentSubCommentId ? 1 : 0,
      parentSubCommentId: parentSubCommentId || null,
    });

    if (parentSubCommentId) {
      await subCommentModel.findByIdAndUpdate(parentSubCommentId, {
        $push: { replies: subCommentDoc._id },
        $max: { depth },
      });
    }

    res.status(201).json({
      status: 201,
      message: "SubComment created successfully",
      body: subCommentDoc,
    });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
}

export async function getSubComments(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const subComments = await subCommentModel
      .find({ commentId, parentSubCommentId: null })
      .populate("replies");
    res.status(200).json({ status: 200, body: subComments });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
}

export async function removeSubComment(req: Request, res: Response) {
  try {
    const { subCommentId } = req.body;
    const subCommentDoc = await subCommentModel.findById(subCommentId);
    if (!subCommentDoc) {
      res.status(404).json({ message: "SubComment not found" });
      return;
    }
    await subCommentModel.deleteOne({ _id: subCommentId });
    res.status(200).json({ status: 200, body: subCommentDoc });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
}
