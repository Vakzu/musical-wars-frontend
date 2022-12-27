import {
  AllEffectsResponse,
  BuyEffectRequest,
  UserEffectsResponse,
} from "../types/Effect";
import { api } from "./api";

export class EffectApi {
  static getAll = () => {
    return api.get<AllEffectsResponse>("/effect/all");
  };

  static buyEffect = (request: BuyEffectRequest) => {
    return api.post<void>("/effect/buy", null, {
      params: { effectId: request.effectId },
    });
  };

  static getUserEffects = () => {
    return api.get<UserEffectsResponse>("/effect/user");
  };
}
