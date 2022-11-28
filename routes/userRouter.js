import express from "express";

import {
  getUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/user", postUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
