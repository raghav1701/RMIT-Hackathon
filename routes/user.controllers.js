const express = require("express");
const router = express.Router();
const userServices = require("../services/user.services");
const Role = require("../helpers/role");
const jwt = require("../helpers/jwt");
const sendEmail = require("../helpers/email");
//routes
router.patch("/resetPassword/:token", resetPassword);
router.post("/login", login);
router.post("/register", register);
router.get("/", jwt(Role.Admin), getAll);
router.get("/current", jwt(), getCurrent);
router.post("/forgotPassword", forgotPassword);
router.get("/:id", getById);

module.exports = router;

function register(req, res, next) {
  console.log("ok");
  userServices
    .register(req.body)
    .then((user) =>
      res.json({
        user: user,
        message: `User Registered successfully with email ${req.body.email}`,
      })
    )
    .catch((error) => next(error));
}

function login(req, res, next) {
  userServices
    .login(req.body)
    .then((user) => {
      console.log(user);
      user
        ? res.json({ user: user, message: "User logged in successfully" })
        : res
            .status(400)
            .json({ message: "Username or password is incorrect." });
    })
    .catch((error) => next(error));
}

function getAll(req, res, next) {
  const currentUser = req.user;
  if (currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Not Authorized!" });
  }
  userServices
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  console.log(req);
  userServices
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.status(404)))
    .catch((error) => next(error));
}

function getById(req, res, next) {
  userServices
    .getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User Not Found!" });
        next();
      }
      return res.json(user);
    })
    .catch((error) => next(error));
}

async function forgotPassword(req, res, next) {
  await userServices
    .forgotPassword(req.body)
    .then(async (resetToken) => {
      // console.log("ok", resetToken);
      const resetURL = `https://itis-group35.vercel.app/resetPassword/${resetToken}`;
      const message = resetURL;

      await sendEmail({
        email: req.body.email,
        subject: "Password change request received",
        message: message,
      });

      // Respond with success message
      return res.status(200).json({
        status: "success",
        message,
      });
    })
    .catch((error) => next(error));
}

async function resetPassword(req, res, next) {
  userServices
    .resetPassword(req)
    .then(() =>
      res.json({
        message: `PC Success`,
      })
    )
    .catch((error) => next(error));
}
