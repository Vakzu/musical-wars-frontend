import { CharacterApi } from "../API/CharacterApi";

export default interface Character {
  id: number;
  name: string;
  health: number;
}

export type AllCharactersResponse = {
    characters: Character[]
}
