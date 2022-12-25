import { UserBalanceResponse, UserOnlineResponse } from "../types/User";
import { api } from "./api";

export class UserApi {
  static getBalance = () => {
    return api.get<UserBalanceResponse>("/user/balance");
  };

  static getOnlineUsers = () => {
    return api.get<UserOnlineResponse>("/user/online");
  };

  static inviteToLobby = (username: string, lobbyId: number) => {
    return api.post<void>(
      "/user/invite?lobbyId=" + lobbyId + "&userName=" + username
    );
  };
}
