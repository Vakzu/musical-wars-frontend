import Entity from "./Entity";

export default interface Hero extends Entity {
  health: number;
  imgSrc: string;
}

export type AllHeroesResponse = {
  heroes: Hero[];
};

export type BuyHeroRequest = {
  heroId: number;
};
