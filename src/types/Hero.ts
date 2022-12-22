import Entity from "./Entity"

export default interface Hero extends Entity {
    imgSrc: string
}

export type AllHeroesResponse = {
    heroes: Hero[]
}

export type BuyHeroRequest = {
    userId: string,
    heroId: number
}

export type BuyHeroResponse = {
    characterId: string
}