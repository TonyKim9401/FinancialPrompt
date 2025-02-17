import React, { useState } from "react";

import InputPrompt from "./pages/prompt/input/InputPrompt";
import OutputPrompt from "./pages/prompt/output/OutputPrompt";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  const [outputData, setOutputData] = useState("");

  return (
    <div className="chat-container">
      <h1>FinChat Assignment by Tony Kim</h1>
      <div className="chat-box">
        <InputPrompt setOutputData={setOutputData} />
        <OutputPrompt outputPrompt={outputData} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
