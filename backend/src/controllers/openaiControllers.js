const axios = require("axios");

const FMP_API_KEY = process.env.FMP_API_KEY;
const FMP_URL = process.env.FMP_URL;
const OPENAI_API_KEY = process.env.CHATGPT_API_KEY;
const OPENAI_URL = process.env.CHATGPT_URL;

// Get Prompt Result Summary
exports.getPromptResultSummary = async (req, res) => {
  try {
    const inputPromptContent = req.body.content;

    const queryResult = await validateQuery(inputPromptContent);

    if (!queryResult.validation) {
      console.log("Invalid query");
      const invalidateMessage =
        "FinChat's assignment has designed for financial related inquiries only. Please try again";
      return res.json({ answer: invalidateMessage });
    }

    const { response, api_urls } = queryResult;

    let fmpData = await fetchFMPData(api_urls);

    const finalResultAnswer = await getFinalResultAnswer(
      inputPromptContent,
      response,
      fmpData
    );

    res.json({ answer: finalResultAnswer });
  } catch (error) {
    console.error("Error in getOpenAISummary:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};

// Query validation and required FMP API analysis
async function validateQuery(inputPromptContent) {
  try {
    const basicValidationPrompt = `
        You are a strict and consistent AI validator that determines whether a given user query is related to company information, financial metrics, earnings call transcripts, or company financial performance.
    
        ### Criteria for a valid query:
        - It must explicitly mention a publicly traded company (e.g., "Apple", "Tesla", "Microsoft") OR a well-known company executive (e.g., "Elon Musk", "Mark Zuckerberg").
        - It must ask about financial performance, earnings, revenue, stock price, or investment-related topics.
        - Questions must be specific to past, present, or future financial or operational performance.
    
        ### Rules:
        1. If all conditions are met, return "validation": true
        2. If any condition is not met, return "validation": false
        3. If the question requires financial data, return relevant API URLs from the **Financial Modeling Prep API (FMP)** (https://site.financialmodelingprep.com/developer/docs)
        4. If financial data is not required, return an AI-generated answer.
        5. When you create "response" You are an AI assistant specializing in financial topics. 
        Provide a concise but informative answer.
    
        ### Expected JSON Output Format:
        {
          "validation": true / false,
          "response": general answer from ChatGPT,
          "api_urls": ["API_URL_1", "API_URL_2", ...] (Only if validation is true and financial data is needed and 'api/v3' only)
        }
    
        ### Examples:
        #### ✅ Valid Queries:
        1. "Summarize Apple's latest earnings call."
           → validation: true
           → response: ""
           → api_urls: ["https://financialmodelingprep.com/api/v3/earning_call_transcript/AAPL"]
        
        2. "What did Tesla's CEO say about profits in the last earnings call?"
           → validation: true
           → response: ""
           → api_urls: ["https://financialmodelingprep.com/api/v3/earning_call_transcript/TSLA"]
        
        3. "What are Mark Zuckerberg’s comments on AI?"
           → validation: true
           → response: ""
    
        #### ❌ Invalid Queries:
        1. "What is the best stock to invest in?" → validation: false
        2. "Tell me about the history of Amazon." → validation: false
        3. "What are the most famous programming languages?" → validation: false
        
        ### Now process this question:
        Question: "${inputPromptContent}"
    `;
    const rawValidationResponse = await axios.post(
      OPENAI_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            content: basicValidationPrompt,
          },
        ],
        max_tokens: 2048, // 1 ~ 4095
        temperature: 0, // 0.0 ~ 2.0
        top_p: 0, // 0 ~ 1.0
        stop: null,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const parsedValidationResponse = JSON.parse(
      rawValidationResponse.data.choices[0].message.content.trim()
    );

    console.log(parsedValidationResponse);

    const generalAnswerPrompt = `
      You are an AI assistant specializing in financial topics. 
      Provide a concise but informative answer to the following question:

      Question: "${inputPromptContent}"
    `;

    const rawGeneralResponse = await axios.post(
      OPENAI_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            content: generalAnswerPrompt,
          },
        ],
        max_tokens: 2048, // 1 ~ 4095
        temperature: 0, // 0.1 ~ 2.0
        top_p: 0, // 0 ~ 1.0
        stop: null,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    parsedValidationResponse.response =
      rawGeneralResponse.data.choices[0].message.content.trim();

    console.log("--------");
    console.log(parsedValidationResponse.response);
    return parsedValidationResponse;
  } catch (error) {
    console.error("Error OpenAI Query Validation", error);
  }
}

// Link to FMP data
async function fetchFMPData(apiUrls) {
  try {
    if (apiUrls.length <= 0) return [];

    const requests = apiUrls.map((url) => {
      // Example url :
      // https://site.financialmodelingprep.com/api/v3/earning_call_transcript/AIRBNB?apikey=YOUR_API_KEY

      url += `?apikey=${FMP_API_KEY}`;

      console.log(url);

      return axios.get(url);
    });

    const responses = await Promise.allSettled(requests);

    return responses.map((res, idx) => ({
      url: apiUrls[idx],
      status: res.status === "fulfilled" ? res.value.status : "rejected",
      data: res.status === "fulfilled" ? res.value.data : null,
      error: res.status === "rejected" ? res.reason.message : null,
    }));
  } catch (error) {
    console.error("Error fetching FMP data:", error);
    return [];
  }
}
