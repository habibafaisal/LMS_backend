import expressAsyncHandler from "express-async-handler";
import jsonwebtoken from "jsonwebtoken";

const validateToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jsonwebtoken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User not authorized");
        }
        req.user = decoded.user;
        console.log("User authorized", req.user);
        next();
      }
    );
    if (!token) {
      res.status(401);
      throw new Error("User not authorized or token missing");
    }
  } else {
    res.status(401);
    throw new Error("User not authorized or token missing");
  }
});

export default validateToken;
