// import { IApiResponse, IPlanet, IStarship, IVehicle } from "./apiTypes";

// export const fetchCharacters = async (
//   searchItem: string,
//   page: number,
// ): Promise<IApiResponse> => {
//   try {
//     const API_URL = `https://swapi.dev/api/people/?search=${searchItem}&page=${page}`;
//     const response = await fetch(API_URL);
//     const data: IApiResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching characters:", error);
//     throw error;
//   }
// };

// export const fetchStarships = async (urls: string[]): Promise<IStarship[]> => {
//   try {
//     const starshipPromises = urls.map((url) =>
//       fetch(url).then((response) => response.json()),
//     );
//     const starshipResults = await Promise.all(starshipPromises);
//     return starshipResults;
//   } catch (error) {
//     console.error("Error fetching starships:", error);
//     throw error;
//   }
// };

// export const fetchVehicles = async (urls: string[]): Promise<IVehicle[]> => {
//   try {
//     const vehiclePromises = urls.map((url) =>
//       fetch(url).then((response) => response.json()),
//     );
//     const vehicleResults = await Promise.all(vehiclePromises);
//     return vehicleResults;
//   } catch (error) {
//     console.error("Error fetching vehicles:", error);
//     throw error;
//   }
// };

// export const fetchPlanet = async (url: string): Promise<IPlanet> => {
//   try {
//     const response = await fetch(url);
//     const planetData = await response.json();
//     return planetData;
//   } catch (error) {
//     console.error("Error fetching planet:", error);
//     throw error;
//   }
// };
