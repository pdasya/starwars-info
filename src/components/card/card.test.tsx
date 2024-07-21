import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./card";

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
    render(<Card character={mockCharacter} onClick={mockOnClick} />);

    expect(screen.getByText("luke skywalker")).toBeInTheDocument();
    expect(screen.getByText(/172 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/77 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/blond/i)).toBeInTheDocument();
    expect(screen.getByText(/fair/i)).toBeInTheDocument();
    expect(screen.getByText(/blue/i)).toBeInTheDocument();
    expect(screen.getByText(/19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    render(<Card character={mockCharacter} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText("luke skywalker"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("includes static overlay text", () => {
    render(<Card character={mockCharacter} onClick={mockOnClick} />);
    expect(screen.getByText("May the Force be with you")).toBeInTheDocument();
  });
});
