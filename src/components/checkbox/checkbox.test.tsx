import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Checkbox from "./checkbox";
import { selectItem, unselectItem } from "@features/selectedItemsSlice";
import { ThemeContext } from "@contexts/themeContext";
import { ICharacter } from "@API/apiTypes";

// Создание мокированного хранилища
const mockStore = configureStore([]);
const initialState = {
  selectedItems: { selectedItems: [] },
};

const mockCharacter: ICharacter = {
  name: "Luke Skywalker",
  url: "1",
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
  created: "",
  edited: "",
};

describe("Checkbox Component", () => {
  it("renders checkbox correctly", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ darkTheme: false }}>
          <Checkbox character={mockCharacter} />
        </ThemeContext.Provider>
      </Provider>,
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("checkbox is checked when item is selected", () => {
    const store = mockStore({
      selectedItems: {
        selectedItems: [
          {
            id: "1",
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            gender: "male",
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ darkTheme: false }}>
          <Checkbox character={mockCharacter} />
        </ThemeContext.Provider>
      </Provider>,
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("checkbox is unchecked when item is not selected", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ darkTheme: false }}>
          <Checkbox character={mockCharacter} />
        </ThemeContext.Provider>
      </Provider>,
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("dispatches selectItem action when checkbox is checked", () => {
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ darkTheme: false }}>
          <Checkbox character={mockCharacter} />
        </ThemeContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(store.dispatch).toHaveBeenCalledWith(
      selectItem({
        id: mockCharacter.url,
        name: mockCharacter.name,
        height: mockCharacter.height,
        mass: mockCharacter.mass,
        gender: mockCharacter.gender,
      }),
    );
  });

  it("dispatches unselectItem action when checkbox is unchecked", () => {
    const store = mockStore({
      selectedItems: {
        selectedItems: [
          {
            id: "1",
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            gender: "male",
          },
        ],
      },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ darkTheme: false }}>
          <Checkbox character={mockCharacter} />
        </ThemeContext.Provider>
      </Provider>,
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(store.dispatch).toHaveBeenCalledWith(unselectItem("1"));
  });

  it("applies dark theme styles when darkTheme is true", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ darkTheme: true }}>
          <Checkbox character={mockCharacter} />
        </ThemeContext.Provider>
      </Provider>,
    );
    const checkboxWrapper = screen.getByRole("checkbox").closest("div");
    expect(checkboxWrapper).toHaveClass(/darkThemeCheckboxWrapper/i);
  });

  it("does not apply dark theme styles when darkTheme is false", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ darkTheme: false }}>
          <Checkbox character={mockCharacter} />
        </ThemeContext.Provider>
      </Provider>,
    );
    const checkboxWrapper = screen.getByRole("checkbox").closest("div");
    expect(checkboxWrapper).not.toHaveClass("darkThemeCheckboxWrapper");
  });
});
