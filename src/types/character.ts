export type CharacterGender = "Male" | "Female" | "Genderless" | "Unknown";
export type CharacterStatus = "Alive" | "Dead" | "Unknown";
export interface Character {
  id: number | string;
  name: string;
  status: CharacterStatus;
  species: string;
  type?: string;
  gender: CharacterGender;

  image: string;
  created: string;
}
type Stringify<S> = {
  [K in keyof S]: string;
};

export interface CreateCharacter
  extends Stringify<
    Omit<Character, "origin" | "location" | "created" | "id">
  > {}
