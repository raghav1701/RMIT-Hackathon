require("dotenv").config();
const db = require("../helpers/db");
const Subject = db.Subject;

async function create(subjectData, userId) {
  console.log("oooooooo", subjectData, userId);
  const subject = new Subject({
    name: subjectData,
    user: userId,
  });
  return await subject.save();
}

async function getAll(userId) {
  return await Subject.find({ user: userId });
}

module.exports = {
  create,
  getAll,
};
