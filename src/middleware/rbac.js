import { constants } from "../utils/constants.js";

const checkRole = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      return res.status(403).json({
        statusCode: constants.UNAUTHORIZED,
        type: "Error",
        message: "Unauthorized access",
      });
    }
    next();
  };
};

export default checkRole;
