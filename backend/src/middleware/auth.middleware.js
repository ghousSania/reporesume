import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * @description: Middleware to protect routes by verifying JWT tokens and attaching the authenticated user to the request object.
 */
const authMiddleware = async (req, res, next) => {
  try {
    // get the token from cookies
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const err = new Error("Authentication token is missing");
      err.status = 401;
      throw err;
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      const err = new Error("Invalid token");
      err.status = 401;
      throw err;
    }
    const userId = decoded.id;

    // find the user in the database
    const user = await User.findById(userId).select(
      "_id username displayName avatarUrl",
    );
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    // attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
