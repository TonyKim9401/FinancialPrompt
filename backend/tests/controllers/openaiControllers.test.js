// Controllers
const {
  getPromptResultSummary,
} = require("../../src/controllers/openaiControllers.js");

// Services
const {
  validateQuery,
  getGeneralResult,
  getFinalAnswer,
} = require("../../src/services/openaiService.js");

const { fetchFMPData } = require("../../src/services/fmpService.js");

// Mocking Services
jest.mock("../../src/services/openaiService.js");
jest.mock("../../src/services/fmpService.js");

describe("Test getPromptResultSummary functions", () => {
  // Test when the query is valid and all services return expected data
  test("should return a final answer when the query is valid", async () => {
    // given
    const req = {
      body: { content: "What is Tesla's expected earnings next quarter?" },
    };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    const validateQueryResult = {
      validation: true,
      response: "Valid financial query",
      api_urls: [
        "https://financialmodelingprep.com/api/v3/earning_call_transcript/TSLA",
      ],
    };

    const generalResult =
      "Tesla's CEO discussed growth prospects in the EV sector.";
    const fmpData = [
      {
        url: "https://financialmodelingprep.com/api/v3/earning_call_transcript/TSLA",
        status: 200,
        data: { earnings: "Tesla's earnings data" },
        error: null,
      },
    ];

    const finalAnswer =
      "Tesla's expected earnings are projected to increase next quarter.";

    validateQuery.mockResolvedValue(validateQueryResult);
    getGeneralResult.mockResolvedValue(generalResult);
    fetchFMPData.mockResolvedValue(fmpData);
    getFinalAnswer.mockResolvedValue(finalAnswer);

    // when
    await getPromptResultSummary(req, res);

    // then
    expect(validateQuery).toHaveBeenCalledWith(req.body.content);
    expect(getGeneralResult).toHaveBeenCalledWith(req.body.content);
    expect(fetchFMPData).toHaveBeenCalledWith(validateQueryResult.api_urls);
    expect(getFinalAnswer).toHaveBeenCalledWith(
      req.body.content,
      generalResult,
      fmpData
    );
    expect(res.json).toHaveBeenCalledWith({ answer: finalAnswer });
  });

  // Test when the query is invalid
  test("should return an invalid query message when the query is invalid", async () => {
    // given
    const req = { body: { content: "What is the history of Google?" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    const validateQueryResult = {
      validation: false,
      response: "",
      api_urls: [],
    };

    validateQuery.mockResolvedValue(validateQueryResult);

    // when
    await getPromptResultSummary(req, res);

    // then
    expect(validateQuery).toHaveBeenCalledWith(req.body.content);
    expect(res.json).toHaveBeenCalledWith({
      answer:
        "FinChat's assignment has designed for financial related inquiries only. Please try again",
    });
  });

  // Test when an error occurs in the process
  test("should handle errors and return a 500 status when an error occurs", async () => {
    // given
    const req = {
      body: { content: "What is Tesla's expected earnings next quarter?" },
    };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    const errorMessage =
      "FinChat's assignment has designed for financial related inquiries only. Please try again";

    validateQuery.mockImplementation(() =>
      Promise.reject(new Error(errorMessage))
    );

    // when
    await getPromptResultSummary(req, res);

    // then
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
