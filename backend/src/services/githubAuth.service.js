const axios = require("axios");

// Exchange the authorization code for an access token
const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    throw new Error("Failed to exchange code for token");
  }
};

// Fetch the user's GitHub profile using the access token
const getGitHubUser = async (accessToken) => {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = response.data;

    return {
      githubProfile: user,
      username: user.login,
      email: user.email,
      githubId: user.id,
      displayName: user.name,
      avatarUrl: user.avatar_url,
    };
  } catch (error) {
    throw new Error("Failed to fetch GitHub user");
  }
};

export { exchangeCodeForToken, getGitHubUser };
