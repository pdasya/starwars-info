import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./pagination";

describe("Pagination Component", () => {
  it("renders the correct number of pages", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />,
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(5);
  });

  it("highlights the current page as active", () => {
    const currentPage = 3;
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={vi.fn()}
      />,
    );
    const activeButton = screen.getByText(currentPage.toString());
    expect(activeButton).toHaveClass(/_active_/i);
  });

  it("disables the button for the current page", () => {
    const currentPage = 2;
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={vi.fn()}
      />,
    );
    const disabledButton = screen.getByText(currentPage.toString());
    expect(disabledButton).toBeDisabled();
  });

  it("calls onPageChange with the right page number when a button is clicked", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );

    const nextPage = screen.getByText("3");
    await userEvent.click(nextPage);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
