import axios from "axios";
/**
 * @description: Create axios instance with GitHub API base URL and authorization header using the provided token. This instance can be used to make authenticated requests to GitHub API.
 */
const githubClient = (token) => {
  return axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
};
/**
 * @description: Fetch the authenticated user's public repositories from GitHub using the provided axios client instance. Returns an array of repository data.
 */

const fetchGitHubUserRepos = async (client) => {
  try {
    const { data } = await client.get(
      "/user/repos?per_page=100&visibility=public",
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user repositories");
  }
};

/**
 * @description: Fetch detailed information about a specific repository, including its README content, programming languages used, and recent commit messages. Uses Promise.allSettled to handle multiple API requests concurrently and gracefully handle any failures.
 */
const fetchRepoDetails = async (client, owner, repo) => {
  try {
    const [readmeRes, langRes, commitsRes] = await Promise.allSettled([
      client.get(`/repos/${owner}/${repo}/readme`),
      client.get(`/repos/${owner}/${repo}/languages`),
      client.get(`/repos/${owner}/${repo}/commits?per_page=10`),
    ]);

    return {
      readme:
        readmeRes.status === "fulfilled"
          ? Buffer.from(readmeRes.value.data.content, "base64").toString(
              "utf-8",
            )
          : "",

      languages: langRes.status === "fulfilled" ? langRes.value.data : {},

      commits:
        commitsRes.status === "fulfilled"
          ? commitsRes.value.data.map((c) => c.commit.message)
          : [],
    };
  } catch {
    console.error("Error fetching repository details");
    return { readme: "", languages: {}, commits: [] };
  }
};
export { githubClient, fetchGitHubUserRepos, fetchRepoDetails };
