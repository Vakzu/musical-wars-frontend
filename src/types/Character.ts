export default interface Character {
  id: number;
  name: string;
  health: number;
  imgSrc: string;
}

export type AllCharactersResponse = {
  characters: Character[];
};
