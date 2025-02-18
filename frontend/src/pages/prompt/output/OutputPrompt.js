import { React, useEffect, useRef } from "react";
import "./OutputPrompt.scss";

function OutputPrompt({ outputPrompt, textareaRef }) {
  const outputTextareaRef = useRef(null);

  useEffect(() => {
    if (outputTextareaRef.current) {
      outputTextareaRef.current.style.height = "auto";
      outputTextareaRef.current.style.height = `${outputTextareaRef.current.scrollHeight}px`;
    }

    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [outputPrompt, textareaRef]);

  return (
    <div className="output-container">
      <div className="output-box">
        <textarea
          ref={outputTextareaRef}
          className="output-textarea"
          value={
            outputPrompt
              ? `Your Question: \n${outputPrompt.question}\n\nAI Answer: \n${outputPrompt.answer}`
              : "The answer will appear here!"
          }
          readOnly
        />
      </div>
    </div>
  );
}

export default OutputPrompt;
