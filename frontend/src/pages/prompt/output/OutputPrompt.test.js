import React from "react";
import { render, screen } from "@testing-library/react";
import OutputPrompt from "./OutputPrompt.js";

describe("OutputPrompt Component", () => {
  it("renders default message when no output", () => {
    render(<OutputPrompt outputPrompt={null} />);
    expect(
      screen.getByDisplayValue("The answer will appear here!")
    ).toBeInTheDocument();
  });

  it("displays question and answer when output is provided", () => {
    render(
      <OutputPrompt
        outputPrompt={{
          question: "What is AI?",
          answer: "AI stands for Artificial Intelligence.",
        }}
      />
    );
    expect(screen.getByDisplayValue(/Your Question:/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/AI Answer:/)).toBeInTheDocument();
  });
});
