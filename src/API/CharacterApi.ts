import { AllCharactersResponse } from "../types/Character";
import { api } from "./api";

export class CharacterApi {
    static getAll = () => {
        return api.get<AllCharactersResponse>("/effect/all");
      };
}