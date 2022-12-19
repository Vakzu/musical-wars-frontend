export interface Effect {
    id: number,
    name: string,
    price: number,
    stamina: number,
    strength: number,
    luck: number,
    constitution: number
}

export type AllEffectsResponse = {
    heroes: Effect[]
}

export type BuyEffectRequest = {
    userId: string,
    effectId: string
}