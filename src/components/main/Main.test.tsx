import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import Main, { MainProps } from "./Main";
import { IApiResponse, ICharacter } from "@API/apiTypes";
import { Provider } from "react-redux";
import store from "@store/store";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
  }),
}));

vi.mock("@modules/details-module/details-module", () => ({
  __esModule: true,
  default: ({
    selectedCharacter,
    onClose,
  }: {
    selectedCharacter: ICharacter;
    isDetailLoading: boolean;
    detailsRef: React.RefObject<HTMLDivElement>;
    onClose: () => void;
    isOpen: boolean;
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
    onSearch,
    onInputChange,
    onItemClick,
  }: {
    searchTerm: string;
    searchResults: ICharacter[];
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    onSearch: () => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

  const initialData: IApiResponse = {
    count: 1,
    results: [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "Tatooine",
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/",
      },
    ],
    next: null,
    previous: null,
  };

  const initialSearchQuery = "Luke";
  const initialPageQuery = 1;

  const defaultProps: MainProps = {
    initialData,
    initialSearchQuery,
    initialPageQuery,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(store, "dispatch").mockImplementation(mockDispatch);
  });

  const renderComponent = (props: Partial<MainProps> = {}) =>
    render(
      <Provider store={store}>
        <Main {...defaultProps} {...props} />
      </Provider>,
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

    expect(screen.getByRole("textbox")).toHaveValue("Leia");
  });

  it("handles item click and displays details section", () => {
    renderComponent();

    const characterItem = screen.getByText("Luke Skywalker");
    fireEvent.click(characterItem);

    expect(screen.getByText("Details Section")).toBeInTheDocument();

    const detailsSections = screen.getAllByText("Luke Skywalker");
    expect(detailsSections.length).toBeGreaterThan(0);
  });

  it("handles details section close", () => {
    renderComponent();

    const characterItem = screen.getByText("Luke Skywalker");
    fireEvent.click(characterItem);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Details Section")).not.toBeInTheDocument();
  });
});
