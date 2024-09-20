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

async function getBySubject(subjectId, userId) {
  try {
    return await Assignment.find({
      subjectId: subjectId,
      user: userId,
    }).populate("subjectId");
  } catch (error) {
    throw new Error(`Error fetching assignments for subject: ${error.message}`);
  }
}

module.exports = {
  create,
  getAll,
  getBySubject, // Export the new function
};
