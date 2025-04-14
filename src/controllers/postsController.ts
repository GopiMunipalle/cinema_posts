import { Request, Response } from "express";
import postsModel from "../models/postsModel";
import commentModel from "../models/commentModel";
import axios from "axios";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://user-service:8080";

export async function createPost(req: Request, res: Response) {
  try {
    const { userId, title, message, creator, tags, images } = req.body;
    const response = await axios.get(`${USER_SERVICE_URL}/api/users/${userId}`);
    console.log("response", response.data);
    if (!response.data) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(201).json({ message: "Post created successfully" });
    return;
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
}
