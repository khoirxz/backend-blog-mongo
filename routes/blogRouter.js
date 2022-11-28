import express from "express";

import {
  deletePost,
  getPost,
  getPosts,
  postBlog,
  updatePost,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/post/:slug", getPost);
router.post("/post", postBlog);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
