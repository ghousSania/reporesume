/**
 * @description Get the currently authenticated user's information
 */

const getCurrentUser = async (req, res, next) => {
  try {
    // authMiddleware should have attached the authenticated user to req.user
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // return user info
    return res.status(200).json({
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

export { getCurrentUser };
