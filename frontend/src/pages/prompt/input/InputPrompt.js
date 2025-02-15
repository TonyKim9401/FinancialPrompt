import React, { useState } from "react";
import axios from "axios";

function InputPrompt() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [charCount, setCharCount] = useState(inputPrompt.length);
  const [data, setData] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputPrompt(newValue);
    setCharCount(newValue.length);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/openai/summarize`,
        {
          content: `${inputPrompt}`,
        }
      );
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  };

  return (
    <div>
      <div>{charCount} / 4096 characters</div>
      <textarea
        value={inputPrompt}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything you want to know here! The character limit is 4096."
        maxLength="4096"
      />
      <button onClick={fetchData}>Search</button>
    </div>
  );
}

export default InputPrompt;
