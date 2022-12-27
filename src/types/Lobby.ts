export type LobbyCreateResponse = {
  lobbyId: string;
};

export type LobbyRequest = {
  lobbyId: string;
};

export type LobbyUsersResponse = {
  userNames: string[];
};

export type LobbySetReadyRequest = {
  commandType: "SET_READY";
  characterId: number;
  songId: number;
  effectId: number;
};
