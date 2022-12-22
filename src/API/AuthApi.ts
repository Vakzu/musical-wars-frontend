import { LoginRequest, RegisterRequest } from "../types/Auth";
import { api } from "./api";

export class AuthApi {
  static login = (user: LoginRequest) => {
    return api.post<void>("/login", {
      username: user.username,
      password: user.password,
    });
  };

  static register = (user: RegisterRequest) => {
    return api.post<void>("/register", {
      username: user.username,
      password: user.password,
    });
  };
}
