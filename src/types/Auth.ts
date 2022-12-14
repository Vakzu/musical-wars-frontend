export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  userId: number;
  username: string;
};
