import { AuthResponse, LoginRequest, RegisterRequest } from "../types/Auth";
import { api } from "./api";

export class AuthApi {
  static login = (user: LoginRequest) => {
    var bodyFormData = new FormData();
    bodyFormData.append("username", user.username);
    bodyFormData.append("password", user.password);

    return api.post<AuthResponse>("/login", bodyFormData, {
      headers: { "Content-Type": `multipart/form-data` },
      withCredentials: true,
    });
  };

  static register = (user: RegisterRequest) => {
    return api.post<AuthResponse>("/register", {
      username: user.username,
      password: user.password,
    });
  };
}
