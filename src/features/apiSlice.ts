import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApiResponse, IPlanet, IStarship, IVehicle } from "../API/apiTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<
      IApiResponse,
      { searchItem: string; page: number }
    >({
      query: ({ searchItem, page }) =>
        `people/?search=${searchItem}&page=${page}`,
    }),
    fetchStarships: builder.query<IStarship[], string[]>({
      queryFn: async (urls) => {
        try {
          const results = await Promise.all(
            urls.map((url) => fetch(url).then((res) => res.json())),
          );
          return { data: results };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
    }),
    fetchVehicles: builder.query<IVehicle[], string[]>({
      queryFn: async (urls) => {
        try {
          const results = await Promise.all(
            urls.map((url) => fetch(url).then((res) => res.json())),
          );
          return { data: results };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
    }),
    fetchPlanet: builder.query<IPlanet, string>({
      query: (url) => (url.startsWith("http") ? url : `planets/${url}`),
    }),
  }),
});

export const {
  useFetchCharactersQuery,
  useFetchStarshipsQuery,
  useFetchVehiclesQuery,
  useFetchPlanetQuery,
} = api;
