export type JoinLobbyRequest = {
    lobbyId: string
}

export type LobbyUsersResponse = {
    userNames: string[]
}

export type LeaveLobbyRequest = JoinLobbyRequest