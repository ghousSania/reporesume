/**
 * @description: Global error handling middleware. Catches errors thrown in route handlers and sends a standardized JSON response with the error message and status code.
 */
export const errorHandler = (err, req, res, next) => {
  console.log("Error handler invoked");
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
