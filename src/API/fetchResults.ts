import { ApiResponse } from "./apiTypes";

export const fetchCharacters = async (
  searchItem: string,
  page: number,
): Promise<ApiResponse> => {
  try {
    const API_URL = `https://swapi.dev/api/people/?search=${searchItem}&page=${page}`;
    const response = await fetch(API_URL);
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
