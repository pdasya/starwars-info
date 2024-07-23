import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ICharacter } from "../../API/apiTypes";
import * as api from "../../API/fetchResults";
import DetailsSection from "./details-module";

describe("DetailsSection", () => {
  const mockCharacter: ICharacter = {
    name: "Luke Skywalker",
    starships: ["starship1"],
    vehicles: ["vehicle1"],
    homeworld: "planet1",
    url: "1",
  };

  const mockProps = {
    selectedCharacter: mockCharacter,
    isDetailLoading: false,
    detailsRef: { current: null },
    onClose: vi.fn(),
    isOpen: true,
  };

  it("renders DetailsSection component correctly", () => {
    render(<DetailsSection {...mockProps} />);
    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
  });

  it("fetches and displays starships, vehicles, and planet", async () => {
    const mockStarships = [{ name: "X-Wing" }];
    const mockVehicles = [{ name: "Speeder Bike" }];
    const mockPlanet = { name: "Tatooine" };

    vi.spyOn(api, "fetchStarships").mockResolvedValue(mockStarships);
    vi.spyOn(api, "fetchVehicles").mockResolvedValue(mockVehicles);
    vi.spyOn(api, "fetchPlanet").mockResolvedValue(mockPlanet);

    render(<DetailsSection {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText(/X-Wing/)).toBeInTheDocument();
      expect(screen.getByText(/Speeder Bike/)).toBeInTheDocument();
      expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
    });
  });

  it("displays error message if fetching starships fails", async () => {
    vi.spyOn(api, "fetchStarships").mockRejectedValue(
      new Error("Error fetching starships"),
    );

    render(<DetailsSection {...mockProps} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /No homeworld information available for this character/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it("displays error message if fetching vehicles fails", async () => {
    vi.spyOn(api, "fetchVehicles").mockRejectedValue(
      new Error("Error fetching vehicles"),
    );

    render(<DetailsSection {...mockProps} />);

    await waitFor(() => {
      expect(
        screen.getByText(/No vehicles available for this character/i),
      ).toBeInTheDocument();
    });
  });

  it("displays error message if fetching planet fails", async () => {
    vi.spyOn(api, "fetchPlanet").mockRejectedValue(
      new Error("Error fetching planet"),
    );

    render(<DetailsSection {...mockProps} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /No homeworld information available for this character/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it("calls onClose when close button is clicked", () => {
    render(<DetailsSection {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
