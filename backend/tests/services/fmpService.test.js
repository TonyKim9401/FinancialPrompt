const axios = require("axios");
const { fetchFMPData } = require("../../src/services/fmpService");

// Mocking axios
jest.mock("axios");

describe("Test fetchFMPData function", () => {
  // Test when the API URLs are valid and the requests succeed
  test("should fetch FMP data successfully when API URLs are provided", async () => {
    // given
    const apiUrls = [
      "https://site.financialmodelingprep.com/api/v3/earning_call_transcript/AAPL",
      "https://site.financialmodelingprep.com/api/v3/earning_call_transcript/MSFT",
    ];
    const mockResponseAAPL = { data: { earnings: "AAPL earnings data" } };
    const mockResponseMSFT = { data: { earnings: "MSFT earnings data" } };

    axios.get.mockResolvedValueOnce({ status: 200, data: mockResponseAAPL });
    axios.get.mockResolvedValueOnce({ status: 200, data: mockResponseMSFT });

    // when
    const result = await fetchFMPData(apiUrls);

    // then
    expect(result).toEqual([
      {
        url: apiUrls[0],
        status: 200,
        data: mockResponseAAPL,
        error: null,
      },
      {
        url: apiUrls[1],
        status: 200,
        data: mockResponseMSFT,
        error: null,
      },
    ]);
  });

  // Test when one of the API requests fails
  test("should handle rejected API request", async () => {
    // given
    const apiUrls = [
      "https://site.financialmodelingprep.com/api/v3/earning_call_transcript/AAPL",
      "https://site.financialmodelingprep.com/api/v3/earning_call_transcript/MSFT",
    ];
    const mockResponseAAPL = { data: { earnings: "AAPL earnings data" } };

    axios.get.mockResolvedValueOnce({ status: 200, data: mockResponseAAPL });
    axios.get.mockRejectedValueOnce(new Error("Request to MSFT failed"));

    // when
    const result = await fetchFMPData(apiUrls);

    // then
    expect(result).toEqual([
      {
        url: apiUrls[0],
        status: 200,
        data: mockResponseAAPL,
        error: null,
      },
      {
        url: apiUrls[1],
        status: "rejected",
        data: null,
        error: "Request to MSFT failed",
      },
    ]);
  });

  // Test when no API URLs are provided
  test("should return an empty array if no API URLs are provided", async () => {
    // given
    const apiUrls = [];

    // when
    const result = await fetchFMPData(apiUrls);

    // then
    expect(result).toEqual([]);
  });

  // Test when an error occurs in fetching data
  test("should handle error when an exception occurs in fetching data", async () => {
    // given
    const apiUrls = [
      "https://site.financialmodelingprep.com/api/v3/earning_call_transcript/AAPL",
    ];

    axios.get.mockRejectedValueOnce(new Error("Error Fetching FMP Data"));

    // when
    const result = await fetchFMPData(apiUrls);

    // then
    expect(result).toEqual([
      {
        url: apiUrls[0],
        status: "rejected",
        data: null,
        error: "Error Fetching FMP Data",
      },
    ]);
  });
});
