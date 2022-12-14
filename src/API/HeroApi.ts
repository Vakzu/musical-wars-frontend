import { AllHeroesResponse, BuyHeroRequest } from "../types/Hero";
import { api } from "./api";

export class HeroApi {
  static getAll = () => {
    return api.get<AllHeroesResponse>("/hero/all", { withCredentials: true });
  };

  static buyHero = (request: BuyHeroRequest) => {
    return api.post<void>("/hero/buy", null, {
      params: { heroId: request.heroId },
    });
  };
}
