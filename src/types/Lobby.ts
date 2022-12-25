export type LobbyCreateResponse = {
    lobbyId: number
}

export type LobbyRequest = {
    lobbyId: number
}

export type LobbyUsersResponse = {
    userNames: string[]
}

export type LobbyStatusResponse = {
    lobbyId?: number,
    isOwner?: boolean
}