import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { ICharacter } from "../../API/apiTypes";
import DetailsSection from "./details-module";
import { ThemeContext } from "@contexts/themeContext";
import {
  useFetchPlanetQuery,
  useFetchStarshipsQuery,
  useFetchVehiclesQuery,
} from "@features/apiSlice";

vi.mock("@features/apiSlice", () => ({
  useFetchPlanetQuery: vi.fn(),
  useFetchStarshipsQuery: vi.fn(),
  useFetchVehiclesQuery: vi.fn(),
}));

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

  beforeEach(() => {
    vi.resetAllMocks();
    (useFetchStarshipsQuery as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useFetchVehiclesQuery as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useFetchPlanetQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
  });

  it("renders DetailsSection component correctly", () => {
    (useFetchStarshipsQuery as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useFetchVehiclesQuery as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useFetchPlanetQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <DetailsSection {...mockProps} />
      </ThemeContext.Provider>,
    );
    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
  });

  it("fetches and displays starships, vehicles, and planet", async () => {
    const mockStarships = [{ name: "X-Wing" }];
    const mockVehicles = [{ name: "Speeder Bike" }];
    const mockPlanet = { name: "Tatooine" };

    (useFetchStarshipsQuery as Mock).mockReturnValue({
      data: mockStarships,
      isLoading: false,
      error: null,
    });
    (useFetchVehiclesQuery as Mock).mockReturnValue({
      data: mockVehicles,
      isLoading: false,
      error: null,
    });
    (useFetchPlanetQuery as Mock).mockReturnValue({
      data: mockPlanet,
      isLoading: false,
      error: null,
    });

    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <DetailsSection {...mockProps} />
      </ThemeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/X-Wing/)).toBeInTheDocument();
      expect(screen.getByText(/Speeder Bike/)).toBeInTheDocument();
      expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
    });
  });

  it("displays error message if fetching starships fails", async () => {
    (useFetchStarshipsQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Error fetching starships"),
    });
    (useFetchVehiclesQuery as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
    (useFetchPlanetQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <DetailsSection {...mockProps} />
      </ThemeContext.Provider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/No starships available for this character/i),
      ).toBeInTheDocument();
    });
  });

  it("displays error message if fetching vehicles fails", async () => {
    (useFetchVehiclesQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Error fetching vehicles"),
    });
    (useFetchPlanetQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
    (useFetchStarshipsQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <DetailsSection {...mockProps} />
      </ThemeContext.Provider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/No vehicles available for this character/i),
      ).toBeInTheDocument();
    });
  });

  it("displays error message if fetching planet fails", async () => {
    (useFetchPlanetQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Error fetching planet"),
    });
    (useFetchStarshipsQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
    (useFetchVehiclesQuery as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <DetailsSection {...mockProps} />
      </ThemeContext.Provider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /No homeworld information available for this character/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <DetailsSection {...mockProps} />
      </ThemeContext.Provider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
