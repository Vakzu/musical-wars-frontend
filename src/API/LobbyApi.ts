import { JoinLobbyRequest, LeaveLobbyRequest, LobbyUsersResponse } from "../types/Lobby";
import { api } from "./api";

export class LobbyApi {
  static createLobby = () => {
    return api.post<void>("/lobby/create");
  };

  static joinLobby = (request: JoinLobbyRequest) => {
    return api.post<void>("/lobby/join", {
      lobbyId: request.lobbyId,
    });
  };

  static leaveLobby = (request: LeaveLobbyRequest) => {
    return api.post<void>("/lobby/leave", {
      lobbyId: request.lobbyId,
    });
  };

  static getUsersInLobby = () => {
    return api.get<LobbyUsersResponse>('/lobby/users')
  }
}
