import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./search";

describe("Search Component", () => {
  const setup = (searchTerm = "") => {
    const handleInputChange = vi.fn();
    const handleSearch = vi.fn();
    render(
      <Search
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />,
    );
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    return { input, handleInputChange, handleSearch };
  };

  it("renders the search input correctly with initial searchTerm", () => {
    const { input } = setup("Luke Skywalker");
    expect(input.value).toBe("Luke Skywalker");
  });

  it("calls onInputChange when the input value is changed", async () => {
    const { input, handleInputChange } = setup();
    await userEvent.type(input, "Leia");
    expect(handleInputChange).toHaveBeenCalled();
  });

  it("triggers onSearch when Enter is pressed", async () => {
    const { input, handleSearch } = setup();
    await userEvent.type(input, "{enter}");
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it("calls onSearch when the search button is clicked", async () => {
    const { handleSearch } = setup();
    const button = screen.getByRole("button", { name: "Search" });
    await userEvent.click(button);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
