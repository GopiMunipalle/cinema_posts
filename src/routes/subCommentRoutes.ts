import { Router } from "express";
import {
  createSubComment,
  getSubComments,
} from "../controllers/subCommentController";
const routes = Router();

routes.post("/", createSubComment);
routes.get("/:commentId", getSubComments);

export default routes;
