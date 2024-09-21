require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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
    const token = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.secret,
      {
        expiresIn: "7d",
      }
    );
    return { ...user.toJSON(), token };
  }
}

async function getAll() {
  console.log("ok");
  return await User.find();
}

async function getById(id) {
  console.log("finding id: ", id);
  return await User.findById(id);
}

module.exports = {
  login,
  getAll,
  getById,
  register,
};
