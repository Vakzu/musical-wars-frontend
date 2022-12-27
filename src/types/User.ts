export interface User {
  id: number;
  name: string;
}

export interface UserInLobby extends User {
  isReady: boolean;
}
