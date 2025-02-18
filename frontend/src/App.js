import React, { useState, useRef } from "react";

import InputPrompt from "./pages/prompt/input/InputPrompt";
import OutputPrompt from "./pages/prompt/output/OutputPrompt";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  const [outputData, setOutputData] = useState("");
  const textareaRef = useRef(null);

  return (
    <div className="chat-container">
      <h1>FinChat Assignment by Tony Kim</h1>
      <div className="chat-box">
        <InputPrompt setOutputData={setOutputData} textareaRef={textareaRef} />
        <OutputPrompt outputPrompt={outputData} textareaRef={textareaRef} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
