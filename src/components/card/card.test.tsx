import { screen, fireEvent } from "@testing-library/react";
import Card from "./card";
import { renderWithProviders } from "@utils/test-utils";

describe("Card Component", () => {
  const mockCharacter = {
    url: "1",
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "2",
    films: ["A New Hope", "The Empire Strikes Back"],
    species: ["5", "6"],
    vehicles: ["7", "9"],
    starships: ["9", "10"],
    created: "11",
    edited: "12",
  };
  const mockOnClick = vi.fn();

  it("renders character information", () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />,
    );

    expect(screen.getByText("luke skywalker")).toBeInTheDocument();
    expect(screen.getByText(/Height/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />,
    );
    fireEvent.click(screen.getByText(/luke skywalker/i));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
