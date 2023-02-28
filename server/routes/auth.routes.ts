import { loginBodySchema } from "@mern-zustand-auth/common";
import { Router } from "express";
import {
  loginHandler,
  profileHandler,
  registerHandler,
} from "../controllers/auth.controller";
import requireAuth from "../middlewares/requireAuth";
import validate from "../middlewares/validate";

const router = Router();

router.post(
  "/login",
  validate(loginBodySchema, "You must be provide a valid email and password"),
  loginHandler
);
router.get("/profile", requireAuth, profileHandler);
router.post("/register", registerHandler);

export default router;
