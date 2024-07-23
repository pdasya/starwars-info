import { ApiResponse, Character } from "./apiTypes";

const API_URL = "https://swapi.dev/api/people/";

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(API_URL);
    const data: ApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
