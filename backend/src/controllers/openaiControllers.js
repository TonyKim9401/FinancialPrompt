const {
  validateQuery,
  getFinalAnswer,
  getGeneralResult,
} = require("../services/openaiService.js");
const { fetchFMPData } = require("../services/fmpService.js");

// Get Prompt Result Summary
const getPromptResultSummary = async (req, res) => {
  try {
    const inputPromptContent = req.body.content;

    const validateResult = await validateQuery(inputPromptContent);

    if (!validateResult.validation) {
      console.log("Invalid query");
      const invalidateMessage =
        "FinChat's assignment has designed for financial related inquiries only. Please try again";
      return res.json({ answer: invalidateMessage });
    }

    const generalResult = await getGeneralResult(inputPromptContent);
    const fmpData = await fetchFMPData(validateResult.api_urls);

    const finalAnswer = await getFinalAnswer(
      inputPromptContent,
      generalResult,
      fmpData
    );

    res.json({ answer: finalAnswer });
  } catch (error) {
    console.error("Error Get Prompt Result Summary:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { getPromptResultSummary };
