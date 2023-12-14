import { Character } from "@/types/character";
import { handleFetch } from "../fetching";
import { Episode } from "@/types/episode";

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
export type EpisodeResponse = Response<Episode>;

const BASE_URL = process.env.RICK_MORTY_API_URL;
const EMPTY_RESPONSE = {
  info: {
    count: 0,
    pages: 0,
  },
  results: [],
};
export const RickAndMortyService = {
  getCharacters: async (filters?: Object): Promise<CharacterResponse> => {
    try {
      return await handleFetch<CharacterResponse>(
        `${BASE_URL}/character`,
        filters
      );
    } catch (error) {
      return EMPTY_RESPONSE;
    }
  },
  getSingleCharacter: async () => {},
  getEpisodes: async (filters?: Object): Promise<EpisodeResponse> => {
    try {
      return await handleFetch<EpisodeResponse>(`${BASE_URL}/episode`, filters);
    } catch (error) {
      return EMPTY_RESPONSE;
    }
  },
};
