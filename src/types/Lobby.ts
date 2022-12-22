export type LobbyCreateResponse = {
    lobbyId: string
}

export type LobbyRequest = {
    lobbyId: string
}

export type LobbyUsersResponse = {
    userNames: string[]
}

export type LobbyStatusResponse = {
    lobbyId?: number,
    isOwner?: boolean
}