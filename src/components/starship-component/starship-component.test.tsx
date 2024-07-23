import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Starships from "./starship-component";

describe("Starships Component", () => {
  const mockStarships = [
    { name: "Millennium Falcon", url: "1" },
    { name: "Star Destroyer", url: "2" },
    { name: "X-wing", url: "3" },
    { name: "Executor", url: "4" },
  ];

  it("shows loading indicator when data is being fetched", () => {
    render(<Starships starships={[]} isLoading={true} />);
    expect(screen.getByText("Loading starships...")).toBeInTheDocument();
  });

  it("displays the starship information when not loading and starship data is available", () => {
    render(<Starships starships={mockStarships} isLoading={false} />);
    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("Star Destroyer")).toBeInTheDocument();
  });

  it("displays a message when not loading and no starship data is available", () => {
    render(<Starships starships={[]} isLoading={false} />);
    expect(
      screen.getByText("No starships available for this character."),
    ).toBeInTheDocument();
  });
});
