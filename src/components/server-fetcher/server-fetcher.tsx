import React from "react";
import { IApiResponse } from "@API/apiTypes";
import ClientComponent from "@components/client-component/client-component";

async function fetchCharacters(
  searchItem: string,
  page: number,
): Promise<IApiResponse> {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${searchItem}&page=${page}`,
  );
  return res.json();
}

interface ServerFetcherProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

const ServerFetcher = async ({ searchParams }: ServerFetcherProps) => {
  const searchQuery = searchParams.search || "";
  const pageQuery = Number(searchParams.page) || 1;

  const data = await fetchCharacters(searchQuery, pageQuery);

  return (
    <ClientComponent
      initialData={data}
      initialSearchQuery={searchQuery}
      initialPageQuery={pageQuery}
    />
  );
};

export default ServerFetcher;
