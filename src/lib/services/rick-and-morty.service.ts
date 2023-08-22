import { Character } from "@/types/character";
import { handleFetch } from "../fetching";

interface Response<Data> {
  info: {
    count: number;
    pages: number;
    next?: string;
    prev?: string;
  };
  results: Data[];
}

export interface CharacterFilters
  extends Pick<Character, "name" | "status" | "species" | "type" | "gender"> {
  page: number;
}

export type CharacterResponse = Response<Character>;

const BASE_URL = process.env.RICK_MORTY_API_URL;

export const RickAndMortyService = {
  getCharacters: async (filters?: Object): Promise<CharacterResponse> => {
    try {
      return await handleFetch<CharacterResponse>(
        `${BASE_URL}/character`,
        filters
      );
    } catch (error) {
      return {
        info: {
          count: 0,
          pages: 0,
        },
        results: [],
      };
    }
  },
};
