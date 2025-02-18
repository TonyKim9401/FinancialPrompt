import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputPrompt from "./InputPrompt.js";

describe("InputPrompt Component", () => {
  it("renders input field and button", () => {
    render(<InputPrompt setOutputData={jest.fn()} />);
    expect(
      screen.getByPlaceholderText(
        "Ask anything you want to know here! The character limit is 1300."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("updates character count on input change", () => {
    render(<InputPrompt setOutputData={jest.fn()} />);
    const input = screen.getByPlaceholderText(
      "Ask anything you want to know here! The character limit is 1300."
    );
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(screen.getByText("5 / 1300 characters")).toBeInTheDocument();
  });

  it("disables button when loading", async () => {
    render(<InputPrompt setOutputData={jest.fn()} />);
    const button = screen.getByRole("button", { name: "Send" });
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });
});
