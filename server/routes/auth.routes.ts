import { Router } from "express";
import { loginHandler, profileHandler } from "../controller/auth.controller";
import requireAuth from "../middleware/requireAuth";

const router = Router();

router.post("/login", loginHandler);
router.get("/profile", requireAuth, profileHandler);

export default router;
