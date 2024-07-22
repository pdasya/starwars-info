import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import AppRoutes from "./app-routes";
import { renderWithProviders } from "@utils/test-utils";

describe("AppRoutes Component", () => {
  it('redirects "/" to "/main"', async () => {
    renderWithProviders(<AppRoutes />, {
      initialEntries: ["/"],
    });
    expect(await screen.findByText(/Find info about/i)).toBeInTheDocument();
  });

  it('renders the Main page at "/main"', async () => {
    renderWithProviders(<AppRoutes />, {
      initialEntries: ["/main"],
    });
    expect(await screen.findByText(/Find info about/i)).toBeInTheDocument();
  });

  it("renders the ErrorPage for undefined routes", async () => {
    renderWithProviders(<AppRoutes />, {
      initialEntries: ["/random"],
    });
    expect(
      await screen.findByText(/is temporarily unavailable/i),
    ).toBeInTheDocument();
  });
});
