import Details from "./details";
import { render, screen, fireEvent } from "@testing-library/react";

const mockDetails = {
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

describe("Details Component", () => {
  it("renders all character details correctly", () => {
    render(<Details details={mockDetails} onClose={() => {}} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("172 cm")).toBeInTheDocument();
    expect(screen.getByText("77 kg")).toBeInTheDocument();
    expect(screen.getByText("blond")).toBeInTheDocument();
    expect(screen.getByText("fair")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
  });
});

describe("Details Component", () => {
  it("calls onClose handler when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<Details details={mockDetails} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
