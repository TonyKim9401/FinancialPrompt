const axios = require("axios");
const {
  validateQuery,
  getGeneralResult,
  getFinalAnswer,
} = require("../../src/services/openaiService");

// Mocking axios
jest.mock("axios");

describe("Test OpenAI Interaction Functions", () => {
  // Test validateQuery
  test("should validate a valid query about financial performance", async () => {
    // given
    const query = "Summarize Apple's latest earnings call.";
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                validation: true,
                response:
                  "Apple's latest earnings call indicates strong performance.",
                api_urls: [
                  "https://financialmodelingprep.com/api/v3/earning_call_transcript/AAPL",
                ],
              }),
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    // when
    const result = await validateQuery(query);

    // then
    expect(result.validation).toBe(true);
    expect(result.response).toBe(
      "Apple's latest earnings call indicates strong performance."
    );
    expect(result.api_urls).toEqual([
      "https://financialmodelingprep.com/api/v3/earning_call_transcript/AAPL",
    ]);
  });

  test("should return false for an invalid query", async () => {
    // given
    const query = "What is the history of Google?";
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                validation: false,
                response: "",
                api_urls: [],
              }),
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    // when
    const result = await validateQuery(query);

    // then
    expect(result.validation).toBe(false);
    expect(result.response).toBe("");
    expect(result.api_urls).toEqual([]);
  });

  // Test getGeneralResult
  test("should provide a general answer to a financial question", async () => {
    // given
    const query =
      "What did Tesla's CEO say about growth prospects in the EV sector?";
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content:
                "Tesla's CEO discussed growth prospects in the electric vehicle sector.",
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    // when
    const result = await getGeneralResult(query);

    // then
    expect(result).toBe(
      "Tesla's CEO discussed growth prospects in the electric vehicle sector."
    );
  });

  // Test getFinalAnswer
  test("should return a detailed final answer based on first response and fmpData", async () => {
    // given
    const query = "What are Tesla's projected earnings next quarter?";
    const firstResponse =
      "Tesla's CEO discussed growth prospects in the electric vehicle sector.";
    const fmpData = { revenue: 100000000, profit: 20000000 }; // mock data
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content:
                "Tesla's revenue is expected to increase by 10% in the next quarter based on current market trends.",
            },
          },
        ],
      },
    };

    axios.post.mockResolvedValue(mockResponse);

    // when
    const result = await getFinalAnswer(query, firstResponse, fmpData);

    // then
    expect(result).toBe(
      "Tesla's revenue is expected to increase by 10% in the next quarter based on current market trends."
    );
  });
});
