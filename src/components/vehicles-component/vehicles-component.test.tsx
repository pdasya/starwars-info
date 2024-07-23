import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Vehicles from "./vehicles-component";

describe("Vehicles Component", () => {
  const mockVehicles = [
    { name: "Speeder bike", url: "1" },
    { name: "AT-AT", url: "2" },
    { name: "Sail barge", url: "3" },
    { name: "AT-ST", url: "4" },
  ];

  it("shows loading indicator when data is being fetched", () => {
    render(<Vehicles vehicles={[]} isLoading={true} />);
    expect(screen.getByText("Loading vehicles...")).toBeInTheDocument();
  });

  it("displays the vehicle information when not loading and vehicle data is available", () => {
    render(<Vehicles vehicles={mockVehicles} isLoading={false} />);
    expect(screen.getByText("Speeder bike")).toBeInTheDocument();
    expect(screen.getByText("AT-AT")).toBeInTheDocument();
    expect(screen.getByText("Sail barge")).toBeInTheDocument();
    expect(screen.getByText("AT-ST")).toBeInTheDocument();
  });

  it("displays a message when not loading and no vehicle data is available", () => {
    render(<Vehicles vehicles={[]} isLoading={false} />);
    expect(
      screen.getByText("No vehicles available for this character."),
    ).toBeInTheDocument();
  });
});
