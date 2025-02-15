import React from "react";

function OutputPrompt({ outputPrompt }) {
  return (
    <div>
      <textarea value={outputPrompt} readOnly />
    </div>
  );
}

export default OutputPrompt;
