const axios = require("axios");

const OPENAI_API_KEY = process.env.CHATGPT_API_KEY;
const OPENAI_URL = process.env.CHATGPT_URL;

exports.interactWithOpenAI = async (AIModel, promptContent) => {
  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: AIModel,
        messages: [{ role: "user", content: promptContent }],
        max_tokens: 2048,
        temperature: 0,
        top_p: 0,
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
    return response;
  } catch (error) {
    console.error(
      "Error interacting with OpenAI:",
      error.response ? error.response.data : error.message
    );
    return { error: "Failed to fetch from OpenAI" };
  }
};
