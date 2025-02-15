const express = require("express");
const { getOpenAISummary } = require("../controllers/openaiControllers.js");

const router = express.Router();

router.post("/summarize", getOpenAISummary); // Call OpenAI Summary API

module.exports = router;
