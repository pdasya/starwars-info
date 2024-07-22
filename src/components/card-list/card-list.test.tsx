import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import CardList from "./card-list";
import { ICharacter } from "../../API/apiTypes";
import { renderWithProviders } from "@utils/test-utils";

interface IMockProps {
  character: ICharacter;
  onClick: () => void;
}

vi.mock("../card/card", () => {
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
    {
      name: "Luke Skywalker",
      url: "1",
      vehicles: ["Snowspeeder", "Imperial Speeder Bike"],
      starships: ["X-wing", "Imperial shuttle"],
    },
    {
      name: "Darth Vader",
      url: "2",
      vehicles: ["31"],
      starships: ["TIE Advanced x1"],
    },
  ];

  it("displays no results message when there are no results", () => {
    const { getByText } = renderWithProviders(
      <CardList results={[]} onItemClick={vi.fn()} />,
    );
    expect(getByText("No results found.")).toBeInTheDocument();
  });

  it("renders cards for each result when results are present", () => {
    const { getAllByTestId } = renderWithProviders(
      <CardList results={mockCharacters} onItemClick={vi.fn()} />,
    );
    const cards = getAllByTestId("mock-card");
    expect(cards.length).toBe(2);
    expect(cards[0]).toHaveTextContent("Luke Skywalker");
    expect(cards[1]).toHaveTextContent("Darth Vader");
  });

  it("calls onItemClick when a card is clicked", async () => {
    const onItemClick = vi.fn();
    const { getAllByTestId } = renderWithProviders(
      <CardList results={mockCharacters} onItemClick={onItemClick} />,
    );

    const firstCard = getAllByTestId("mock-card")[0];
    await userEvent.click(firstCard);

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(mockCharacters[0]);
  });
});
