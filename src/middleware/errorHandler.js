import { constants } from "../utils/constants.js";
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      res.status(500).json({
        title: "Unknown Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

export default errorHandler;
