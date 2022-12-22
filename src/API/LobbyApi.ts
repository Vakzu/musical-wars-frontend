import {
  LobbyCreateResponse,
  LobbyRequest,
  LobbyStatusResponse,
  LobbyUsersResponse,
} from "../types/Lobby";
import { api } from "./api";

export class LobbyApi {
  static createLobby = () => {
    return api.post<LobbyCreateResponse>("/lobby/create");
  };

  static joinLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/join?lobbyId=" + request.lobbyId);
  };

  static getLobbyStatus = (request: LobbyRequest) => {
    return api.post<LobbyStatusResponse>("/lobby/status?lobbyId=" + request.lobbyId);
  };

  static leaveLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/leave?lobbyId=" + request.lobbyId);
  };

  // Fight start
  static startLobby = (request: LobbyRequest) => {
    return api.post<void>("/lobby/start?lobbyId=" + request.lobbyId);
  };

  static setReady = (request: LobbyRequest) => {
    return api.post<void>("/lobby/ready/set?lobbyId=" + request.lobbyId);
  };

  static cancelReady = (request: LobbyRequest) => {
    return api.post<void>("/lobby/ready/cancel?lobbyId=" + request.lobbyId);
  };

  static getUsersInLobby = () => {
    return api.get<LobbyUsersResponse>("/lobby/users");
  };
}
