import { Router } from "express";
const route = Router();

import {
  createPost,
  getPost,
  getPosts,
  removePosts,
} from "../controllers/postsController";

route.post("/", createPost);
route.get("/", getPost);
route.get("/all", getPosts);
route.delete("/", removePosts);

export default route;
