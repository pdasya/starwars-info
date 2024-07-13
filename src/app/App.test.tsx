import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

vi.mock("../views/main/main-page", () => {
  return {
    default: () => <div>Main Page</div>,
  };
});

vi.mock("../views/error-page/error-page", () => {
  return {
    default: () => <div>Error Page</div>,
  };
});

describe("App Component", () => {
  it('redirects "/" to "/main"', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByText("Main Page")).toBeInTheDocument();
  });

  it('renders the Main page at "/main"', async () => {
    render(
      <MemoryRouter initialEntries={["/main"]}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByText("Main Page")).toBeInTheDocument();
  });

  it("renders the ErrorPage for undefined routes", async () => {
    render(
      <MemoryRouter initialEntries={["/random"]}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByText("Error Page")).toBeInTheDocument();
  });
});
