const axios = require("axios");

const FMP_API_KEY = process.env.FMP_API_KEY;
const FMP_URL = process.env.FMP_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_URL = process.env.OPENAI_URL;

// Get Company profile

exports.getCompanyProfile = async (req, res) => {
  try {
    const { symbol } = req.query; // 예: ?symbol=AAPL

    const url = `${FMP_URL}/profile/${symbol}?apikey=${FMP_API_KEY}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching company profile");
  }
};

// Get FMP Financial Data
exports.getFinancialData = async (req, res) => {
  try {
    const { symbol } = req.query; // 예: ?symbol=AAPL

    const url = `${FMP_URL}/quote/${symbol}?apikey=${FMP_API_KEY}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching financial data");
  }
};

// Get Income Statement Data
exports.getIncomeStatement = async (req, res) => {
  try {
    const { symbol } = req.query; // 예: ?symbol=AAPL

    const url = `${FMP_URL}/income-statement/${symbol}?apikey=${FMP_API_KEY}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching income statement");
  }
};

// Get Stock News
exports.getStockNews = async (req, res) => {
  try {
    const { symbol } = req.query; // 예: ?symbol=AAPL

    const url = `${FMP_URL}/stock_news?tickers=${symbol}&apikey=${FMP_API_KEY}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching stock news: ", error);
  }
};

// OpenAI Summary 생성
exports.getOpenAISummary = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      `${OPENAI_URL}/completions`,
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
      },
      {
        headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching summary");
  }
};
