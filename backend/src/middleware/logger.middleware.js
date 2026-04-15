import morgan from "morgan";

// The logger will track every incoming HTTP request
export const loggerMiddleware = morgan("dev");
