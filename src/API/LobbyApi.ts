import {
  LobbyRequest,
  LobbySetReadyRequest,
} from "../types/Lobby";
import { api } from "./api";
import { UserInLobby } from "../types/User";

export class LobbyApi {
  static createLobby = () => {
    return api.post<string>("/lobby/create");
  };

  static joinLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/join", null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  //returns host userId
  static getLobbyStatus = (request: LobbyRequest) => {
    return api.post<number>("/lobby/status", null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  static leaveLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/leave", null, {
      params: { lobbyId: request.lobbyId },
    });
  };

  // Fight start
  static startLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/start", null, {
      params: { lobbyId: request.lobbyId,
                locationId: 1 },
    });
  };

  static setReady = (
    lobbyRequest: LobbyRequest,
    readyRequest: LobbySetReadyRequest
  ) => {
    return api.post<void>(
      "/lobby/ready/set",
      readyRequest,
      {
        params: { lobbyId: lobbyRequest.lobbyId },
      }
    );
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
