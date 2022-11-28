import express from "express";

import { checkId, Login, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", Login);
router.get("/verify", checkId);
router.delete("/logout", logout);

export default router;
