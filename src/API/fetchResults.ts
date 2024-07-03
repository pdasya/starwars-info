const API_URL = "https://swapi.dev/api/people/";

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

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
