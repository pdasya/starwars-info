import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import Main, { MainProps } from "./Main";
import { IApiResponse, ICharacter } from "@API/apiTypes";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("@modules/details-module/details-module", () => ({
  __esModule: true,
  default: ({
    selectedCharacter,
    onClose,
  }: {
    selectedCharacter: ICharacter;
    onClose: () => void;
  }) => (
    <div>
      <div>Details Section</div>
      <div>{selectedCharacter.name}</div>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock("@modules/search-module/search-module", () => ({
  __esModule: true,
  default: ({
    searchTerm,
    searchResults,
    onInputChange,
    onSearch,
    onItemClick,
  }: {
    searchTerm: string;
    searchResults: ICharacter[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
    onItemClick: (character: ICharacter) => void;
    onPageChange: (page: number) => void;
  }) => (
    <div>
      <div>Search Section</div>
      <input value={searchTerm} onChange={onInputChange} />
      <button onClick={onSearch}>Search</button>
      {searchResults.map((char) => (
        <div key={char.name} onClick={() => onItemClick(char)}>
          {char.name}
        </div>
      ))}
    </div>
  ),
}));

describe("Main Component", () => {
  const mockDispatch = vi.fn();
  const mockPush = vi.fn();
  const mockUseRouter = useRouter as Mock;
  const mockUseDispatch = useDispatch as unknown as Mock;
  const mockUseSelector = useSelector as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue({ query: {}, push: mockPush });
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({
        currentPage: { currentPage: 1 },
      }),
    );
  });

  const initialData: IApiResponse = {
    count: 1,
    results: [{ name: "Luke Skywalker" } as ICharacter],
  };

  const renderComponent = (props: Partial<MainProps> = {}) =>
    render(
      <Main
        initialData={initialData}
        initialSearchQuery=""
        initialPageQuery={1}
        {...props}
      />,
    );

  it("renders search section and details section correctly", () => {
    renderComponent();

    expect(screen.getByText("Search Section")).toBeInTheDocument();
    expect(screen.queryByText("Details Section")).not.toBeInTheDocument();
  });

  it("handles search input change", () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Leia" } });

    expect(input).toHaveValue("Leia");
  });

  it("handles search button click", async () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Leia" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/main",
      query: { search: "Leia", page: "1" },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "currentPage/setCurrentPage",
      payload: 1,
    });
  });

  it("handles item click and displays details section", () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Leia" } });

    const characterItem = screen.getByText("Luke Skywalker");
    fireEvent.click(characterItem);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/main",
      query: {
        search: "Leia",
        page: "1",
        character: "Luke Skywalker",
      },
    });

    const detailsSection = screen.getByText("Details Section").parentElement;
    expect(detailsSection).toBeInTheDocument();
    if (detailsSection) {
      expect(
        within(detailsSection).getByText("Luke Skywalker"),
      ).toBeInTheDocument();
    }
  });

  it("handles details section close", () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Leia" } });

    const characterItem = screen.getByText("Luke Skywalker");
    fireEvent.click(characterItem);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/main",
      query: { search: "Leia", page: "1" },
    });

    expect(screen.queryByText("Details Section")).not.toBeInTheDocument();
  });
});
