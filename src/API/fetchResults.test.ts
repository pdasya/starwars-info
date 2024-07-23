import { describe, it, expect, vi } from "vitest";
import {
  fetchCharacters,
  fetchPlanet,
  fetchStarships,
  fetchVehicles,
} from "./fetchResults";

export const mockApiResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: ["https://swapi.dev/api/films/1/"],
      species: [],
      vehicles: ["https://swapi.dev/api/vehicles/14/"],
      starships: ["https://swapi.dev/api/starships/12/"],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/",
    },
  ],
};

export const mockPlanet = {
  name: "Tatooine",
  rotation_period: "23",
  orbital_period: "304",
  diameter: "10465",
  climate: "arid",
  gravity: "1 standard",
  terrain: "desert",
  surface_water: "1",
  population: "200000",
  residents: ["https://swapi.dev/api/people/1/"],
  films: ["https://swapi.dev/api/films/1/"],
  created: "2014-12-09T13:50:49.641000Z",
  edited: "2014-12-20T20:58:18.411000Z",
  url: "https://swapi.dev/api/planets/1/",
};

export const mockStarship = {
  name: "X-wing",
  model: "T-65 X-wing",
  manufacturer: "Incom Corporation",
  cost_in_credits: "149999",
  length: "12.5",
  max_atmosphering_speed: "1050",
  crew: "1",
  passengers: "0",
  cargo_capacity: "110",
  consumables: "1 week",
  hyperdrive_rating: "1.0",
  MGLT: "100",
  starship_class: "Starfighter",
  pilots: ["https://swapi.dev/api/people/1/"],
  films: ["https://swapi.dev/api/films/1/"],
  created: "2014-12-12T11:19:05.340000Z",
  edited: "2014-12-20T21:23:49.886000Z",
  url: "https://swapi.dev/api/starships/12/",
};

export const mockVehicle = {
  name: "Snowspeeder",
  model: "t-47 airspeeder",
  manufacturer: "Incom corporation",
  cost_in_credits: "unknown",
  length: "4.5",
  max_atmosphering_speed: "650",
  crew: "2",
  passengers: "0",
  cargo_capacity: "10",
  consumables: "none",
  vehicle_class: "airspeeder",
  pilots: ["https://swapi.dev/api/people/1/"],
  films: ["https://swapi.dev/api/films/1/"],
  created: "2014-12-15T12:22:12Z",
  edited: "2014-12-20T21:30:21.672000Z",
  url: "https://swapi.dev/api/vehicles/14/",
};

describe("API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchCharacters should return data when fetch is successful", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockApiResponse),
    });

    const data = await fetchCharacters("Luke", 1);
    expect(data).toEqual(mockApiResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/?search=Luke&page=1",
    );
  });

  it("fetchStarships should return data when fetch is successful", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockStarship),
    });

    const data = await fetchStarships(["https://swapi.dev/api/starships/12/"]);
    expect(data).toEqual([mockStarship]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/starships/12/",
    );
  });

  it("fetchVehicles should return data when fetch is successful", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockVehicle),
    });

    const data = await fetchVehicles(["https://swapi.dev/api/vehicles/14/"]);
    expect(data).toEqual([mockVehicle]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/vehicles/14/",
    );
  });

  it("fetchPlanet should return data when fetch is successful", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockPlanet),
    });

    const data = await fetchPlanet("https://swapi.dev/api/planets/1/");
    expect(data).toEqual(mockPlanet);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets/1/",
    );
  });

  it("fetchCharacters should throw error when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));

    await expect(fetchCharacters("Luke", 1)).rejects.toThrow("Fetch failed");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/?search=Luke&page=1",
    );
  });

  it("fetchStarships should throw error when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));

    await expect(
      fetchStarships(["https://swapi.dev/api/starships/12/"]),
    ).rejects.toThrow("Fetch failed");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/starships/12/",
    );
  });

  it("fetchVehicles should throw error when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));

    await expect(
      fetchVehicles(["https://swapi.dev/api/vehicles/14/"]),
    ).rejects.toThrow("Fetch failed");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/vehicles/14/",
    );
  });

  it("fetchPlanet should throw error when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));

    await expect(
      fetchPlanet("https://swapi.dev/api/planets/1/"),
    ).rejects.toThrow("Fetch failed");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets/1/",
    );
  });
});
