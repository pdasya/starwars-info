import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import React from "react";

describe("Root component", () => {
  it("renders App without crashing", () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );

    expect(rootElement).toBeDefined();
    document.body.removeChild(rootElement);
  });

  it("checks if App component is rendered", () => {
    const { getByText } = render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    expect(getByText(/Find info about/i)).toBeInTheDocument();
  });
});
