import Character from "../types/Character";
import Song from "../types/Song";
import { api } from "./api";

export class CharacterApi {
  static getAll = () => {
    return api.get<Character[]>("/character/all");
  };

  static getSongs = (characterId: number) => {
    return api.get<Song[]>("/character/songs", {
      params: { characterId },
    });
  };
}
