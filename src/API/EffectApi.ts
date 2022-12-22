import { AllEffectsResponse, BuyEffectRequest } from "../types/Effect";
import { api } from "./api";

export class EffectApi {
  static getAll = () => {
    return api.get<AllEffectsResponse>("/effect/all");
  };

  static buyEffect = (request: BuyEffectRequest) => {
    return api.post<void>("/effect/buy?effectId=" + request.effectId);
  };
}
