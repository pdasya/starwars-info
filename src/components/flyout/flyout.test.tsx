import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Flyout from "./flyout";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { unselectAllItems } from "@features/selectedItemsSlice";
import { downloadCSV } from "@utils/downloadCsv";

const mockStore = configureStore([]);
const initialState = {
  selectedItems: { selectedItems: [] },
};

vi.mock("@utils/downloadCsv", () => ({
  downloadCSV: vi.fn(),
}));

describe("Flyout Component", () => {
  it("does not render if no items are selected", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );
    expect(screen.queryByText(/item is selected/i)).not.toBeInTheDocument();
  });

  it("renders correctly when items are selected", () => {
    const store = mockStore({
      selectedItems: { selectedItems: [{ id: 1, name: "Luke Skywalker" }] },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );
    expect(screen.getByText(/1 item is selected/i)).toBeInTheDocument();
  });

  it("calls unselectAllItems when 'Unselect all' button is clicked", () => {
    const store = mockStore({
      selectedItems: { selectedItems: [{ id: 1, name: "Luke Skywalker" }] },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    fireEvent.click(screen.getByText(/Unselect all/i));
    expect(store.dispatch).toHaveBeenCalledWith(unselectAllItems());
  });

  it("calls downloadCSV when 'Download' button is clicked", () => {
    const selectedItems = [{ id: 1, name: "Luke Skywalker" }];
    const store = mockStore({
      selectedItems: { selectedItems },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    fireEvent.click(screen.getByText(/Download/i));
    expect(downloadCSV).toHaveBeenCalledWith(selectedItems, "1_characters.csv");
  });
});
