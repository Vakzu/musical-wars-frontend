import {
  LobbyCreateResponse,
  LobbyRequest,
  LobbyStatusResponse,
  LobbyUsersResponse,
} from "../types/Lobby";
import { api } from "./api";
import { User, UserInLobby } from "../types/User";

export class LobbyApi {
  static createLobby = () => {
    return api.post<string>("/lobby/create");
  };

  static joinLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/join?lobbyId=" + request.lobbyId, null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  static getLobbyStatus = (request: LobbyRequest) => {
    return api.post<LobbyStatusResponse>(
      "/lobby/status?lobbyId=" + request.lobbyId,
      null,
      {
        params: { lobbyId: request.lobbyId },
      }
    );
  };

  static leaveLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/leave", null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  // Fight start
  static startLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/start?lobbyId=" + request.lobbyId, null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  static setReady = (request: LobbyRequest) => {
    return api.post<void>("/lobby/ready/set", null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  static cancelReady = (request: LobbyRequest) => {
    return api.post<void>("/lobby/ready/cancel", null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  static getUsersInLobby = (request: LobbyRequest) => {
    return api.get<UserInLobby[]>("/lobby/users", {
      params: { lobbyId: request.lobbyId },
    });
  };
}
