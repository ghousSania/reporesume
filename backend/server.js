import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Connect to the database before starting the server
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
