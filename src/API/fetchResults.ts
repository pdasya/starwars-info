import { ApiResponse, Planet, Starship, Vehicle } from "./apiTypes";

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

export const fetchStarships = async (urls: string[]): Promise<Starship[]> => {
  try {
    const starshipPromises = urls.map((url) =>
      fetch(url).then((response) => response.json()),
    );
    const starshipResults = await Promise.all(starshipPromises);
    return starshipResults;
  } catch (error) {
    console.error("Error fetching starships:", error);
    throw error;
  }
};

export const fetchVehicles = async (urls: string[]): Promise<Vehicle[]> => {
  try {
    const vehiclePromises = urls.map((url) =>
      fetch(url).then((response) => response.json()),
    );
    const vehicleResults = await Promise.all(vehiclePromises);
    return vehicleResults;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

export const fetchPlanet = async (url: string): Promise<Planet> => {
  try {
    const response = await fetch(url);
    const planetData = await response.json();
    return planetData;
  } catch (error) {
    console.error("Error fetching planet:", error);
    throw error;
  }
};
