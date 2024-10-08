require("dotenv").config();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = decoded;
    console.log("success");
    next();
  });
};

module.exports = authenticationMiddleware;
