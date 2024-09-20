require("dotenv").config();
const expressJwt = require("express-jwt");
const db = require("../helpers/db");

function jwt() {
  const secret = process.env.secret;
  if (!secret) {
    console.error("JWT secret is not set in environment variables");
    process.exit(1);
  }
  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret, algorithms: ["HS256"] }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await db.User.findById(req.user.sub);

      if (!user) {
        // user's role is not authorized
        return res.status(401).json({ message: "Only Admin is Authorized!" });
      }
      // authentication and authorization successful
      req.user = user;
      next();
    },
  ];
}
module.exports = jwt;
