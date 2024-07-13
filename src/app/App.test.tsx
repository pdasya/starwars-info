import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  it('redirects "/" to "/main"', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/Find info about/i)).toBeInTheDocument();
  });

  it('renders the Main page at "/main"', async () => {
    render(
      <MemoryRouter initialEntries={["/main"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Find info about/i)).toBeInTheDocument();
  });

  it("renders the ErrorPage for undefined routes", async () => {
    render(
      <MemoryRouter initialEntries={["/some/undefined/route"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(/is temporarily unavailable/i),
    ).toBeInTheDocument();
  });
});
