import express from "express";
import helmet from "helmet";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware for security headers
app.use(helmet());
// Middleware for logging
app.use(loggerMiddleware);
// Routes
app.use("/auth", authRouter);

// Middleware for error handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

export default app;
