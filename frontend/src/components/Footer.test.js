import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer.js";

describe("Footer Component", () => {
  it("renders all social links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/TonyKim9401"
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ktony/"
    );
    expect(screen.getByRole("link", { name: /envelope/i })).toHaveAttribute(
      "href",
      "mailto:ktony.tech@gmail.com"
    );
  });
});
