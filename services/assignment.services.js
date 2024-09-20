require("dotenv").config();
const db = require("../helpers/db");
const Assignment = db.Assignment;

async function create(assignmentData, userId) {
  const assignment = new Assignment({
    title: assignmentData.title,
    description: assignmentData.description,
    dueDate: assignmentData.dueDate,
    subjectId: assignmentData.subjectId,
    user: userId,
  });
  return await assignment.save();
}

async function getAll(userId) {
  console.log(userId, "getAllaaaaaa");
  return await Assignment.find({ user: userId }).populate("subjectId");
}

module.exports = {
  create,
  getAll,
};
