import React, { useState } from "react";

import InputPrompt from "./pages/prompt/input/InputPrompt";
import OutputPrompt from "./pages/prompt/output/OutputPrompt";
import FinancialData from "./pages/FinancialData";

function App() {
  const [outputPrompt, setOutputPrompt] = useState("");

  return (
    <div>
      <div>
        <FinancialData />
      </div>
      <div>
        <InputPrompt />
      </div>
      <div>
        <OutputPrompt
          outputPrompt={outputPrompt}
          setOutputPrompt={setOutputPrompt}
        />
      </div>
    </div>
  );
}

export default App;
