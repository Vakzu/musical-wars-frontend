import { User } from "../types/User";
import { api } from "./api";

export class UserApi {
  static getBalance = () => {
    return api.get<number>("/user/balance");
  };

  static getOnlineUsers = () => {
    return api.get<User[]>("/user/online");
  };
}
