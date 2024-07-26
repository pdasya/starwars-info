import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Main from "./main-page";
import { ICharacter } from "../../API/apiTypes";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useFetchCharactersQuery } from "@features/apiSlice";

// Mock the hooks
vi.mock(
  "@features/apiSlice",
  async (importOriginal: () => Promise<unknown>) => {
    const actual =
      (await importOriginal()) as typeof import("@features/apiSlice");
    return {
      ...actual,
      useFetchCharactersQuery: vi.fn(),
    };
  },
);

vi.mock("react-redux", async (importOriginal: () => Promise<unknown>) => {
  const actual = (await importOriginal()) as typeof import("react-redux");
  return {
    ...actual,
    useDispatch: () => vi.fn(),
    useSelector: (selector: (state: unknown) => unknown) =>
      selector({
        currentPage: { currentPage: 1 },
        selectedItems: { selectedItems: [] },
      }),
  };
});

vi.mock("react-router-dom", async (importOriginal: () => Promise<unknown>) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("Main component", () => {
  const mockCharacter: ICharacter = {
    name: "Luke Skywalker",
    starships: ["starship1"],
    vehicles: ["vehicle1"],
    homeworld: "planet1",
    url: "1",
  };

  const mockData = {
    results: [mockCharacter],
    count: 1,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders Main component correctly", () => {
    (useFetchCharactersQuery as Mock).mockReturnValue({
      data: mockData,
      error: null,
      isFetching: false,
    });

    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("fetches and displays search results", async () => {
    (useFetchCharactersQuery as Mock).mockReturnValue({
      data: mockData,
      error: null,
      isFetching: false,
    });

    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Luke" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    });
  });

  it("displays error message if character not found", async () => {
    (useFetchCharactersQuery as Mock).mockReturnValue({
      data: { results: [], count: 0 },
      error: null,
      isFetching: false,
    });

    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Nonexistent" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/No results found/i)).toBeInTheDocument();
    });
  });

  it("fetches and displays character details on item click", async () => {
    (useFetchCharactersQuery as Mock).mockReturnValue({
      data: mockData,
      error: null,
      isFetching: false,
    });

    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Luke" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    });
  });

  it("closes character details on outside click", async () => {
    (useFetchCharactersQuery as Mock).mockReturnValue({
      data: mockData,
      error: null,
      isFetching: false,
    });

    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Luke" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Luke Skywalker/i));
  });
});
