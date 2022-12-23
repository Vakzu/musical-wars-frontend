import { AuthResponse, LoginRequest, RegisterRequest } from "../types/Auth";
import { api } from "./api";

export class AuthApi {
  static login = (user: LoginRequest) => {
    return api.post<AuthResponse>("/login", {
      username: user.username,
      password: user.password,
    });
  };

  static register = (user: RegisterRequest) => {
    return api.post<AuthResponse>("/register", {
      username: user.username,
      password: user.password,
    });
  };
}
