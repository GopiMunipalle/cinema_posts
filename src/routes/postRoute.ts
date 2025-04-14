import { Router } from "express";
const route = Router();

import { createPost } from "../controllers/postsController";

route.post("/", createPost);

export default route;
