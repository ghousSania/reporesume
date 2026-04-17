import User from "../models/user.model.js";
import {
  exchangeCodeForToken,
  getGitHubUser,
  getGitHubAuthURL,
} from "../services/githubAuth.service.js";
import { generateAccessToken } from "../utils/generateToken.js";
import { encrypt } from "../utils/encryption.js";
/**
 * @description: Redirects the user to GitHub's OAuth page to initiate the authentication process.
 */
const redirectToGithub = (req, res) => {
  const authURL = getGitHubAuthURL();
  return res.redirect(authURL);
};

// GET /auth/github/callback
/**
 * @description: Handles the callback from GitHub after authentication.
 */
const githubCallback = async (req, res, next) => {
  try {
    // Extract the authorization code from the query parameters
    const { code } = req.query;
    if (!code) {
      const err = new Error("Authorization code is missing");
      err.status = 400;
      throw err;
    }

    // Exchange the authorization code for an access token
    const githubAccessToken = await exchangeCodeForToken(code);

    // Encrypt the GitHub access token
    const encryptedToken = encrypt(githubAccessToken);

    // Fetch the user's GitHub profile using the access token
    const githubUser = await getGitHubUser(githubAccessToken);
    // upsert user
    // If a user with the given GitHub ID already exists, update their information and token.
    // If no such user exists, create a new user with the provided GitHub information and token.
    const user = await User.findOneAndUpdate(
      { githubId: githubUser.githubId },
      {
        githubId: githubUser.githubId,
        username: githubUser.username,
        displayName: githubUser.displayName,
        avatarUrl: githubUser.avatarUrl,
        accessToken: encryptedToken, // always update latest token
      },
      {
        returnDocument: "after",
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );
    // generate JWT Token
    const jwtToken = generateAccessToken(user);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { redirectToGithub, githubCallback };
