import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import * as React from "react";
import { Provider } from "react-redux";
import store from "@/store/store";

describe("Root component", () => {
  it("renders App without crashing", () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    ReactDOM.createRoot(rootElement).render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>,
    );

    expect(rootElement).toBeDefined();
    document.body.removeChild(rootElement);
  });

  it("checks if App component is rendered", () => {
    const { getByText } = render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>,
    );
    expect(getByText(/Find info about/i)).toBeInTheDocument();
  });
});
