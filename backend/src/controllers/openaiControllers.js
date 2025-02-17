const { interactWithOpenAI } = require("../services/openaiService.js");
const { fetchFMPData } = require("../services/fmpService.js");

// Get Prompt Result Summary
exports.getPromptResultSummary = async (req, res) => {
  try {
    const inputPromptContent = req.body.content;

    const validateResult = await validateQuery(inputPromptContent);
    const generalResult = await getGeneralResult(inputPromptContent);
    validateResult.response = generalResult;

    if (!validateResult.validation) {
      console.log("Invalid query");
      const invalidateMessage =
        "FinChat's assignment has designed for financial related inquiries only. Please try again";
      return res.json({ answer: invalidateMessage });
    }

    const { response, api_urls } = validateResult;

    const fmpData = await fetchFMPData(api_urls);

    const finalAnswer = await getFinalAnswer(
      inputPromptContent,
      response,
      fmpData
    );

    res.json({ answer: finalAnswer });
  } catch (error) {
    console.error("Error Get Prompt Result Summary:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
};

// Validate Query and required FMP API analysis
async function validateQuery(inputPromptContent) {
  try {
    const validationPromptContent = `
        You are a strict and consistent AI validator that determines whether a given user query is related to company information, financial metrics, earnings call transcripts, or company financial performance.
    
        ### Criteria for a valid query:
        - It must explicitly mention a publicly traded company (e.g., "Apple", "Tesla", "Microsoft") OR a well-known company executive (e.g., "Elon Musk", "Mark Zuckerberg").
        - It must ask about financial performance, earnings, revenue, stock price, or investment-related topics.
        - Questions must be specific to past, present, or future financial or operational performance.
    
        ### Rules:
        1. If all conditions are met, return "validation": true
        2. If any condition is not met, return "validation": false
        3. If the question requires financial data, return relevant API URLs from the **Financial Modeling Prep API (FMP)** (https://site.financialmodelingprep.com/developer/docs)
        4. You are an AI assistant specializing in financial topics. 
        Provide a concise but informative answer to the following question at the response part.
    
        ### Expected JSON Output Format:
        {
          "validation": true / false,
          "response": "AI-generated answer",
          "api_urls": ["API_URL_1", "API_URL_2", ...] (Only if validation is true and financial data is needed and 'api/v3' only)
        }
    
        ### Examples:
        #### ✅ Valid Queries:
        1. "Summarize Apple's latest earnings call."
           → validation: true
           → response: "AI-generated answer",
           → api_urls: ["https://financialmodelingprep.com/api/v3/earning_call_transcript/AAPL"]
        
        2. "What did Tesla's CEO say about profits in the last earnings call?"
           → validation: true
           → response: "AI-generated answer",
           → api_urls: ["https://financialmodelingprep.com/api/v3/earning_call_transcript/TSLA"]
        
        3. "What are Mark Zuckerberg’s comments on AI?"
           → validation: true
           → response: "AI-generated answer",
    
        #### ❌ Invalid Queries:
        1. "What is the best stock to invest in?" → validation: false
        2. "Tell me about the history of Amazon." → validation: false
        3. "What are the most famous programming languages?" → validation: false
        
        ### Your Response:
        {
          "validation": (true or false),
          "response": (If validation is true, generate a brief AI-generated answer based on the question. Otherwise, return an empty string),
          "api_urls": (If validation is true and financial data is needed, provide relevant API URLs. Otherwise, return an empty array [])
        }
    

        ### Now process this question:
        Question: "${inputPromptContent}"
    `;

    const response = await interactWithOpenAI(
      "gpt-4-turbo",
      validationPromptContent
    );

    return JSON.parse(response.data.choices[0].message.content.trim());
  } catch (error) {
    console.error("Error OpenAI Query Validation", error);
  }
}

// Get General Result from ChatGPT
// Using gpt-3.5-turbo to reduce the cost *Cheaper than gpt-4-turbo
async function getGeneralResult(inputPromptContent) {
  try {
    const generalAnswerPrompt = `
      You are an AI assistant specializing in financial topics. 
      Provide a concise but informative answer to the following question:

      Question: "${inputPromptContent}"
    `;

    const response = await interactWithOpenAI(
      "gpt-3.5-turbo",
      generalAnswerPrompt
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error Get General Result", error);
  }
}

// Get Final Answer from OpenAI
async function getFinalAnswer(inputPromptContent, firstResponse, fmpData) {
  try {
    const combinedPromptContent = `
    You are a financial AI assistant. Analyze the following question.
    Give me the answer of the following questions using given firstResponse and fmpData

    - firstResponse: "${firstResponse}"
    - fmpData: "${JSON.stringify(fmpData)}"

    Question: ${inputPromptContent}

    Please answer with detail information. Not too short.
    To improve readability by adding appropriate \n line breaks 
    You don't need to mention there was firstResponse or fmpData to make an answer.

    I know you are going to work very nicely. Thank you!
    `;

    const response = await interactWithOpenAI(
      "gpt-4-turbo",
      combinedPromptContent
    );

    console.log(response.data.choices[0].message.content.trim());

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error Get Final Answer from OpenAI", error);
  }
}
