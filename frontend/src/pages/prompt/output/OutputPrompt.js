import { React, useEffect, useRef } from "react";
import "./OutputPrompt.scss";

function OutputPrompt({ outputPrompt }) {
  const outputTextareaRef = useRef(null);

  useEffect(() => {
    if (outputTextareaRef.current) {
      outputTextareaRef.current.style.height = "auto";
      outputTextareaRef.current.style.height = `${outputTextareaRef.current.scrollHeight}px`;
    }
  }, [outputPrompt]);

  return (
    <div className="output-container">
      <div className="output-box">
        <textarea
          ref={outputTextareaRef}
          className="output-textarea"
          value={outputPrompt}
          readOnly
          placeholder="The answer will appear here!"
        />
      </div>
    </div>
  );
}

export default OutputPrompt;
