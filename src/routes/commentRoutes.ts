import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commentsController";
const route = Router();

route.post("/", createComment);
route.get("/", getComments);
route.put("/", updateComment);
route.delete("/", deleteComment);

export default route;
