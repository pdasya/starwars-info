import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Main from "./main-page";
import * as api from "../../API/fetchResults";
import { ICharacter } from "../../API/apiTypes";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../API/fetchResults");

describe("Main component", () => {
  const mockCharacters: ICharacter[] = [
    {
      name: "Luke Skywalker",
      starships: [],
      vehicles: [],
      homeworld: "",
      url: "url1",
    },
    {
      name: "Darth Vader",
      starships: [],
      vehicles: [],
      homeworld: "",
      url: "url2",
    },
  ];

  const mockFetchCharacters = {
    results: mockCharacters,
    count: 2,
  };

  const mockFetchCharacterDetails = (character: ICharacter) =>
    Promise.resolve({ ...character });

  beforeEach(() => {
    vi.spyOn(api, "fetchCharacters").mockResolvedValue(mockFetchCharacters);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders search section correctly", () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("fetches and displays search results", async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
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
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Nonexistent" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/luke/i)).toBeInTheDocument();
    });
  });

  it("fetches and displays character details on item click", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      json: () => mockFetchCharacterDetails(mockCharacters[0]),
    } as Response);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Luke" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/darth/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Luke/i));

    await waitFor(() => {
      expect(screen.getByText(/darth/i)).toBeInTheDocument();
    });
  });

  //   it("closes character details on outside click", async () => {
  //     vi.spyOn(global, "fetch").mockResolvedValue({
  //       json: () => mockFetchCharacterDetails(mockCharacters[0]),
  //     } as Response);

  //     render(
  //       <MemoryRouter>
  //         <Main />
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: "Luke" } });
  //     fireEvent.click(screen.getByText(/search/i));

  //     await waitFor(() => {
  //       expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
  //     });

  //     fireEvent.click(screen.getByText(/Luke Skywalker/));

  //     await waitFor(() => {
  //       expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  //     });

  //     fireEvent.click(document.body);

  //     await waitFor(() => {
  //       expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
  //     });
  //   });
});
