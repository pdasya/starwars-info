import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach, afterEach, expect, Mock } from "vitest";
import { IApiResponse } from "@API/apiTypes";
import ServerFetcher from "./server-fetcher";

const mockData: IApiResponse = {
  count: 1,
  results: [
    {
      name: "Luke Skywalker",
      vehicles: [],
      starships: [],
      url: "",
    },
  ],
};

vi.mock("@components/client-component/client-component", () => ({
  __esModule: true,
  default: ({
    initialData,
    initialSearchQuery,
    initialPageQuery,
  }: {
    initialData: IApiResponse;
    initialSearchQuery: string;
    initialPageQuery: number;
  }) => (
    <div>
      <div>Client Component</div>
      <div>Data: {JSON.stringify(initialData)}</div>
      <div>Search Query: {initialSearchQuery}</div>
      <div>Page Query: {initialPageQuery}</div>
    </div>
  ),
}));

describe("ServerFetcher Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    ) as Mock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = async (
    searchParams: { search?: string; page?: string } = {
      search: "",
      page: "1",
    },
  ) => {
    const Page = await ServerFetcher({ searchParams });
    render(Page);
    await waitFor(() => screen.getByText("Client Component"));
  };

  it("renders ClientComponent with correct data", async () => {
    await renderComponent({ search: "Luke", page: "1" });

    expect(screen.getByText("Client Component")).toBeInTheDocument();
    expect(screen.getByText(/Data:.*Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText("Search Query: Luke")).toBeInTheDocument();
    expect(screen.getByText("Page Query: 1")).toBeInTheDocument();
  });

  it("handles missing search and page parameters", async () => {
    await renderComponent();

    expect(screen.getByText("Client Component")).toBeInTheDocument();
    expect(screen.getByText(/Data:.*Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/Search Query:/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Query:/i)).toBeInTheDocument();
  });

  it("handles different search and page parameters", async () => {
    await renderComponent({ search: "Leia", page: "2" });

    expect(screen.getByText("Client Component")).toBeInTheDocument();
    expect(screen.getByText(/Data:.*Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText("Search Query: Leia")).toBeInTheDocument();
    expect(screen.getByText("Page Query: 2")).toBeInTheDocument();
  });
});
