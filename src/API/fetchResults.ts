import { ApiResponse, Character } from "./apiTypes";

export const fetchCharacters = async (
  searchItem: string,
): Promise<Character[]> => {
  try {
    const allCharacters: Character[] = [];
    let nextPage: string | null =
      `https://swapi.dev/api/people/?search=${searchItem}`;

    while (nextPage) {
      const response = await fetch(nextPage);
      const data: ApiResponse = await response.json();
      allCharacters.push(...data.results);
      nextPage = data.next;
    }

    return allCharacters;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
