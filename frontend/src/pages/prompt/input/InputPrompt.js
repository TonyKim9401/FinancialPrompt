import React, { useState } from "react";
import axios from "axios";
import "./InputPrompt.scss";

function InputPrompt({ setOutputData }) {
  const [inputPrompt, setInputPrompt] = useState("");
  const [charCount, setCharCount] = useState(inputPrompt.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.preventDefault();
        setInputPrompt((content) => content + "\n");
      } else {
        e.preventDefault();
        fetchData();
      }
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputPrompt(newValue);
    setCharCount(newValue.length);
  };

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/openai/summarize`,
        {
          content: `${inputPrompt}`,
        }
      );
      console.log(response.data.answer);
      setOutputData({
        question: inputPrompt,
        answer: response.data.answer,
      });
    } catch (error) {
      console.error("Error fetching financial data:", error);
      setOutputData({
        question: inputPrompt,
        answer: "Please try again later.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="input-container">
      <div className="bottom-bar">
        <span className="char-count">{charCount} / 1300 characters</span>
      </div>
      <textarea
        className="input-box"
        value={inputPrompt}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything you want to know here! The character limit is 1300."
        maxLength="1301"
        disabled={isLoading}
      />
      <button
        className={`send-button ${isLoading ? "loading-button" : ""}`}
        onClick={fetchData}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Send"}
      </button>
    </div>
  );
}

export default InputPrompt;
