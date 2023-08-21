export type CharacterGender = "Male" | "Female" | "Genderless" | "Unknown";
export type CharacterStatus = "Alive" | "Dead" | "Unknown";
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  created: string;
}
