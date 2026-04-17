import jwt from "jsonwebtoken";
/**
 * @description: utility function to generate JWT token
 * @param {Object} user - The user object
 * @returns {String} - The generated JWT token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
