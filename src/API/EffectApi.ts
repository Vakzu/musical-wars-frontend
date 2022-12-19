import {
    AllEffectsResponse,
    BuyEffectRequest,
    BuyEffectResponse
} from '../types/Effect'
import { api } from './api'

export class HeroApi {
    static getAll = () => {
        return api.get<AllEffectsResponse>("/effect/all")
    }
    static buyHero = (request: BuyEffectRequest) => {
        return api.post<BuyEffectResponse>("/effect/buy", {
            userId: request.userId,
            heroId: request.effectId
        })
    }
}