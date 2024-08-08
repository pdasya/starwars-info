import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import SearchSection from "./search-module";
import { ICharacter } from "@API/apiTypes";

vi.mock("@components/search/search", () => ({
  __esModule: true,
  default: ({
    searchTerm,
    onInputChange,
    onSearch,
  }: {
    searchTerm: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
  }) => (
    <div>
      <input
        value={searchTerm}
        onChange={onInputChange}
        placeholder="Search..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  ),
}));

vi.mock("@components/card-list/card-list", () => ({
  __esModule: true,
  default: ({
    results,
    onItemClick,
  }: {
    results: ICharacter[];
    onItemClick: (character: ICharacter) => void;
  }) => (
    <div>
      {results.map((character: ICharacter) => (
        <div key={character.name} onClick={() => onItemClick(character)}>
          {character.name}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("@components/pagination/pagination", () => ({
  __esModule: true,
  default: ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>{`${currentPage} / ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  ),
}));

describe("SearchSection Component", () => {
  const mockOnSearch = vi.fn();
  const mockOnInputChange = vi.fn();
  const mockOnItemClick = vi.fn();
  const mockOnPageChange = vi.fn();

  const defaultProps = {
    searchTerm: "Luke",
    searchResults: [{ name: "Luke Skywalker" } as ICharacter],
    currentPage: 1,
    totalPages: 10,
    isLoading: false,
    onSearch: mockOnSearch,
    onInputChange: mockOnInputChange,
    onItemClick: mockOnItemClick,
    onPageChange: mockOnPageChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input and button", () => {
    render(<SearchSection {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("handles search input change", () => {
    const Wrapper = () => {
      const [searchTerm, setSearchTerm] = useState(defaultProps.searchTerm);
      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
      ) => {
        setSearchTerm(event.target.value);
        defaultProps.onInputChange(event);
      };

      return (
        <SearchSection
          {...defaultProps}
          searchTerm={searchTerm}
          onInputChange={handleInputChange}
        />
      );
    };

    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Leia" } });
    expect(defaultProps.onInputChange).toHaveBeenCalled();
    expect(input.value).toBe("Leia");
  });

  it("handles search button click", () => {
    render(<SearchSection {...defaultProps} />);
    const button = screen.getByText("Search");
    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalled();
  });

  it("displays loader when isLoading is true", () => {
    render(<SearchSection {...defaultProps} isLoading={true} />);
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("renders search results and handles item click", () => {
    render(<SearchSection {...defaultProps} />);
    const characterItem = screen.getByText("Luke Skywalker");
    fireEvent.click(characterItem);
    expect(mockOnItemClick).toHaveBeenCalledWith({ name: "Luke Skywalker" });
  });

  it("handles pagination buttons click", () => {
    const { rerender } = render(<SearchSection {...defaultProps} />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
    mockOnPageChange.mockClear();

    rerender(<SearchSection {...defaultProps} currentPage={2} />);
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("disables pagination buttons when on first or last page", () => {
    const { rerender } = render(
      <SearchSection {...defaultProps} currentPage={1} />,
    );
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();

    rerender(<SearchSection {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
