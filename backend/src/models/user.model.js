import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    displayName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    avatarUrl: {
      type: String,
    },

    accessToken: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
