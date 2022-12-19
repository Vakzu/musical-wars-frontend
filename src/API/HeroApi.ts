import {
    AllHeroesResponse,
    BuyHeroRequest,
    BuyHeroResponse
} from '../types/Hero'
import { api } from './api'

export class HeroApi {
    static getAll = () => {
        return api.get<AllHeroesResponse>("/hero/all")
    }
    static buyHero = (request: BuyHeroRequest) => {
        return api.post<BuyHeroResponse>("/hero/buy", {
            userId: request.userId,
            heroId: request.heroId
        })
    }
}