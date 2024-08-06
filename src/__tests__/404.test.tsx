import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorPage from "../app/not-found";

describe("ErrorPage component", () => {
  it("renders the error message correctly", () => {
    render(<ErrorPage />);

    expect(screen.getByText(/I have bad news for you/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /The page you are looking for might be removed or is temporarily unavailable/i,
      ),
    ).toBeInTheDocument();
  });
});
