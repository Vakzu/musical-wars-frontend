import Character from "../types/Character";
import { api } from "./api";

export class CharacterApi {
  static getAll = () => {
    return api.get<Character[]>("/character/all");
  };
}
