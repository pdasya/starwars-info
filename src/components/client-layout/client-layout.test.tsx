import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import ClientLayout from "./client-layout";
import { ThemeContextProps } from "@contexts/themeContext";

vi.mock("@contexts/themeContext", () => ({
  __esModule: true,
  ThemeContext: {
    Provider: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: ThemeContextProps;
    }) => (
      <div
        data-testid="theme-context"
        data-theme={value.darkTheme ? "dark" : "light"}
      >
        {children}
      </div>
    ),
  },
}));

vi.mock("@components/error-boundary/error-boundary", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
}));

describe("ClientLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (children: React.ReactNode) =>
    render(<ClientLayout>{children}</ClientLayout>);

  it("renders children correctly", () => {
    renderComponent(<div>Test Child</div>);

    expect(screen.getByText("Test Child")).toBeInTheDocument();
    expect(screen.getByTestId("theme-context")).toBeInTheDocument();
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });

  it("provides the theme context correctly", () => {
    renderComponent(<div>Test Child</div>);

    const themeContext = screen.getByTestId("theme-context");
    expect(themeContext).toHaveAttribute("data-theme", "light");
  });

  it("uses the ErrorBoundary correctly", () => {
    renderComponent(<div>Test Child</div>);

    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
  });
});
