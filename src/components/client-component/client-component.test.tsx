import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { MainProps } from "@components/main/Main";
import { Provider } from "react-redux";
import store from "@store/store";
import { IApiResponse, ICharacter } from "@API/apiTypes";
import ClientComponent from "./client-component";

vi.mock("@components/main/Main", () => ({
  __esModule: true,
  default: ({
    initialData,
    initialSearchQuery,
    initialPageQuery,
  }: MainProps) => (
    <div>
      <div>Main Component</div>
      <div>Data: {JSON.stringify(initialData)}</div>
      <div>Search Query: {initialSearchQuery}</div>
      <div>Page Query: {initialPageQuery}</div>
    </div>
  ),
}));

describe("ClientComponent", () => {
  const initialCharacter: ICharacter = {
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
  };

  const initialData: IApiResponse = {
    count: 1,
    results: [initialCharacter],
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
  });

  const renderComponent = (props: Partial<MainProps> = {}) =>
    render(
      <Provider store={store}>
        <ClientComponent {...defaultProps} {...props} />
      </Provider>,
    );

  it("renders Main component with correct data", () => {
    renderComponent();

    expect(screen.getByText("Main Component")).toBeInTheDocument();
    expect(screen.getByText(/Data:.*Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText("Search Query: Luke")).toBeInTheDocument();
    expect(screen.getByText("Page Query: 1")).toBeInTheDocument();
  });

  it("renders Main component with different data", () => {
    const newCharacter: ICharacter = {
      name: "Leia Organa",
      height: "150",
      mass: "49",
      hair_color: "brown",
      skin_color: "light",
      eye_color: "brown",
      birth_year: "19BBY",
      gender: "female",
      homeworld: "Alderaan",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/5/",
    };

    const newProps: MainProps = {
      initialData: {
        count: 1,
        results: [newCharacter],
        next: null,
        previous: null,
      },
      initialSearchQuery: "Leia",
      initialPageQuery: 2,
    };

    renderComponent(newProps);

    expect(screen.getByText("Main Component")).toBeInTheDocument();
    expect(screen.getByText(/Data:.*Leia Organa/)).toBeInTheDocument();
    expect(screen.getByText("Search Query: Leia")).toBeInTheDocument();
    expect(screen.getByText("Page Query: 2")).toBeInTheDocument();
  });
});
