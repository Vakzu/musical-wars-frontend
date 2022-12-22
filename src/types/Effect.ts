import Entity from "./Entity"

export default interface Effect extends Entity {
    stamina: number,
    strength: number,
    luck: number,
    constitution: number
}

export type AllEffectsResponse = {
    effects: Effect[]
}

export type BuyEffectRequest = {
    userId: string,
    effectId: number
}

export type BuyEffectResponse = {
    inventoryId: string
}