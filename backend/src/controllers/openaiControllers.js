const axios = require("axios");

const OPENAI_API_KEY = process.env.CHATGPT_API_KEY;
const OPENAI_URL = process.env.CHATGPT_URL;

// OpenAI Summary
exports.getOpenAISummary = async (req, res) => {
  try {
    const inputPromptContent = req.body.content;
    const response = await axios.post(
      OPENAI_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          // user message
          { role: "user", content: inputPromptContent },
        ],
        max_tokens: 4095, // 1 ~ 4095
        temperature: 1, // 0.1 ~ 1
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data.choices[0].message.content.trim());
  } catch (error) {
    console.error(error);
    res.status(500).send("Error OpenAI Summary");
  }
};
