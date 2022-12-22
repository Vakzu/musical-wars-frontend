import {
    AllEffectsResponse,
    BuyEffectRequest,
    BuyEffectResponse
} from '../types/Effect'
import { api } from './api'

export class EffectApi {
    static getAll = () => {
        return api.get<AllEffectsResponse>("/effect/all")
    }
    static buyEffect = (request: BuyEffectRequest) => {
        return api.post<BuyEffectResponse>("/effect/buy", {
            userId: request.userId,
            heroId: request.effectId
        })
    }
}