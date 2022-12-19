export type CreateLobbyRequest = {
    userId: string
}

export type CreateLobbyResponse = {
    lobbyId: string
}

export type JoinLobbyRequest = {
    userId: string,
    lobbyId: string
}

export type JoinLobbyResponse = CreateLobbyResponse

export type LeaveLobbyRequest = JoinLobbyRequest

export type LeaveLobbyResponse = CreateLobbyResponse