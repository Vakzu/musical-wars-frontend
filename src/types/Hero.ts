export interface Hero {
    id: number,
    name: string,
    price: number,
    health: number
}

export type AllHeroesResponse = {
    heroes: Hero[]
}

export type BuyHeroRequest = {
    userId: string,
    heroId: string
}

