import express from "express";
import helmet from "helmet";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware for security headers
app.use(helmet());
// Middleware for logging
app.use(loggerMiddleware);
// Middleware to parse cookies
app.use(cookieParser());
// Routes
app.use("/auth", authRouter);

// Middleware for error handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

export default app;
