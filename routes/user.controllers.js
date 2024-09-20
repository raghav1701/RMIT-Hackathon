const express = require("express");
const router = express.Router();
const userServices = require("../services/user.services");
const subjectServices = require("../services/subject.services");
const assignmentServices = require("../services/assignment.services");
const jwt = require("../helpers/jwt");
const sendEmail = require("../helpers/email");

//routes
router.get("/fetchsubjects", jwt(), getSubjects);
router.get("/fetchassignments", jwt(), getAssignments);
router.post("/login", login);
router.post("/register", register);
router.get("/current", jwt(), getCurrent);
router.get("/:id", getById);
router.post("/summary", summary);

// routes for subjects
router.post("/addsubject", jwt(), createSubject);

// routes for assignments
router.post("/addassignment", jwt(), createAssignment);

module.exports = router;

function register(req, res, next) {
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

async function summary(req, res, next) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send("No text provided.");
  }

  try {
    // Use dynamic import here
    const { pipeline } = await import("@xenova/transformers");
    const pipe = await pipeline("summarization");
    const result = await pipe(text, {
      max_length: 150,
      min_length: 30,
    });

    const summary = result[0].summary_text;
    console.log("Summarized text:", summary);

    res.json({
      message: "Text received and summarized successfully!",
      originalText: text,
      summary: summary,
    });
  } catch (error) {
    console.error("Error during summarization:", error);
    res.status(500).json({
      message: "Error occurred during summarization",
      error: error.message,
    });
  }
}

function createSubject(req, res, next) {
  const userId = req.user._id;
  const { name } = req.body;
  console.log("okok", name, userId);
  subjectServices
    .create(name, userId)
    .then((subject) => res.json(subject))
    .catch((err) => {
      console.error("Error creating subject:", err);
      res
        .status(500)
        .json({ message: "Error creating subject", error: err.message });
    });
}

function getSubjects(req, res, next) {
  const userId = req.user._id;

  subjectServices
    .getAll(userId)
    .then((subjects) => res.json(subjects))
    .catch((error) => {
      console.error("Error fetching subjects:", error);
      res
        .status(500)
        .json({ message: "Error fetching subjects", error: error.message });
    });
}

function createAssignment(req, res, next) {
  assignmentServices
    .create(req.body, req.user._id)
    .then((assignment) =>
      res.json({
        assignment: assignment,
        message: `Assignment created successfully`,
      })
    )
    .catch((error) => next(error));
}

function getAssignments(req, res, next) {
  assignmentServices
    .getAll(req.user._id)
    .then((assignments) => res.json(assignments))
    .catch((error) => next(error));
}
