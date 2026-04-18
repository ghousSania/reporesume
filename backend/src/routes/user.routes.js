import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";
const userRouter = Router();

// GET /user/me - Get the currently authenticated user's information
userRouter.get("/me", authMiddleware, getCurrentUser);

export default userRouter;
