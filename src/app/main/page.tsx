"use client";

import Main from "@components/main/Main";
import store from "@store/store";
import { Provider } from "react-redux";

async function fetchCharacters(searchItem: string, page: number) {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${searchItem}&page=${page}`,
  );
  return res.json();
}

export default async function MainPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const searchQuery = searchParams.search || "";
  const pageQuery = Number(searchParams.page) || 1;

  const data = await fetchCharacters(searchQuery, pageQuery);

  return (
    <Provider store={store}>
      <Main
        initialData={data}
        initialSearchQuery={searchQuery}
        initialPageQuery={pageQuery}
      />
    </Provider>
  );
}
