import { Router } from "express";
import {
  redirectToGithub,
  githubCallback,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router();

// GET /auth/github - Redirects the user to GitHub's OAuth page
authRouter.get("/github", redirectToGithub);

// POST /auth/github/callback - Handles the callback from GitHub after authentication
// This route will be implemented to handle the exchange of the authorization code for an access token
// and to fetch the user's GitHub profile information.
authRouter.get("/github/callback", githubCallback);

authRouter.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
export default authRouter;
