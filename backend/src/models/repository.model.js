import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(
  {
    githubRepoId: { 
        type: String, 
        required: true,
         unique: true 
        },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },

    name: String,
    description: String,
    repoUrl: String,

    primaryLanguage: String,
    languages: Object,

    stars: Number,
    lastPushedAt: Date,

    recentCommitMessages: [String],
    readmeContent: String,

    isFlagship: { 
        type: Boolean, 
        default: false
     },

    lastSyncedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Repository", repositorySchema);
