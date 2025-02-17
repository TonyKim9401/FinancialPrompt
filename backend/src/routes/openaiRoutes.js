const express = require("express");
const {
  getPromptResultSummary,
} = require("../controllers/openaiControllers.js");

const router = express.Router();

router.post("/summarize", getPromptResultSummary); // Call OpenAI Summary API

module.exports = router;
