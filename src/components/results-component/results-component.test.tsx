import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import Card from '../card-component/card-component';
import Result from "./results-component";
import { ICharacter } from "../../API/apiTypes";

interface IMockProps {
  character: ICharacter;
  onClick: () => void;
}

vi.mock("../card-component/card-component", () => {
  return {
    __esModule: true,
    default: ({ character, onClick }: IMockProps) => (
      <div onClick={() => onClick()} data-testid="mock-card">
        {character.name}
      </div>
    ),
  };
});

describe("Result Component", () => {
  const mockCharacters = [
    { name: "Luke Skywalker", url: "1" },
    { name: "Darth Vader", url: "2" },
  ];

  it("displays no results message when there are no results", () => {
    render(<Result results={[]} onItemClick={vi.fn()} />);
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("renders cards for each result when results are present", () => {
    render(<Result results={mockCharacters} onItemClick={vi.fn()} />);
    const cards = screen.getAllByTestId("mock-card");
    expect(cards.length).toBe(2);
    expect(cards[0]).toHaveTextContent("Luke Skywalker");
    expect(cards[1]).toHaveTextContent("Darth Vader");
  });

  it("calls onItemClick when a card is clicked", async () => {
    const onItemClick = vi.fn();
    render(<Result results={mockCharacters} onItemClick={onItemClick} />);

    const firstCard = screen.getAllByTestId("mock-card")[0];
    await userEvent.click(firstCard);

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(mockCharacters[0]);
  });
});
