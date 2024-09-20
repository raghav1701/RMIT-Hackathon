const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const config = require("../config.json");
const db = require("../helpers/db");
const User = db.User;

async function register(userParam) {
  const user = await User.findOne({ email: userParam.email });
  if (user) throw `This email already exists: ${userParam.email}`;
  const newUser = new User(userParam);
  if (userParam.password) {
    newUser.password = bcrypt.hashSync(userParam.password, 10);
  }
  await newUser.save();
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  console.log("user model", user);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
      expiresIn: "7d",
    });
    return { ...user.toJSON(), token };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  console.log("finding id: ", id);
  return await User.findById(id);
}

async function forgotPassword({ email }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw `Could not find user: ${email}`;
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetTokenExpiration = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  return resetToken;
}

async function resetPassword(req) {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(token);
  const user = await User.findOne({
    passwordResetToken: token,
  });

  if (!user) {
    throw `Invalid Token`;
  }

  user.password = bcrypt.hashSync(req.body.password, 10);
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiration = undefined;
  user.passwordChangedAt = Date.now();

  user.save();
}

module.exports = {
  login,
  getAll,
  getById,
  register,
  forgotPassword,
  resetPassword,
};
