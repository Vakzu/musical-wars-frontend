import { FightTurn } from "./Fight";

export type MembersChangeMessage = {
  type: "JOIN" | "LEAVE";
  userId: number;
  username: string;
};

export type ReadyStateChangeMessage = {
  type: "SET_READY" | "CANCEL_READY";
  userId: number;
};

export type StartFightMessage = {
  moves: FightTurn[];
};

export type InviteLobbyMessage = {
  senderName: string;
  recepientName: string;
  lobbyId: string;
};
