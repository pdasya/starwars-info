import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./error-boundary-component";

const ProblemChild = () => {
  throw new Error("Test Error");
};

describe("ErrorBoundary", () => {
  let originalError: {
    (...data: unknown[]): void;
    (message?: unknown, ...optionalParams: unknown[]): void;
    (...data: unknown[]): void;
    (message?: unknown, ...optionalParams: unknown[]): void;
  };

  beforeEach(() => {
    originalError = console.error;
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it("should display the child component when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <div>no errors here</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText("no errors here")).toBeInTheDocument();
  });

  it("should display an error message when an error is thrown", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText(/some disturbance in the force there is/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });
});
