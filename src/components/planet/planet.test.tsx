import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Planet from "./planet";

describe("Planet Component", () => {
  const mockPlanet = {
    name: "Tatooine",
    url: "1",
  };

  it("shows loading indicator when data is being fetched", () => {
    render(<Planet planet={null} isLoading={true} />);
    expect(screen.getByText("Loading planet...")).toBeInTheDocument();
  });

  it("displays the planet information when not loading and planet data is available", () => {
    render(<Planet planet={mockPlanet} isLoading={false} />);
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
  });

  it("displays a message when not loading and no planet data is available", () => {
    render(<Planet planet={null} isLoading={false} />);
    expect(
      screen.getByText(
        "No homeworld information available for this character.",
      ),
    ).toBeInTheDocument();
  });
});
