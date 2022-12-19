import {
    AllHeroesResponse,
    CreateLobbyResponse,
    JoinLobbyRequest,
    JoinLobbyResponse,
    LeaveLobbyRequest,
    LeaveLobbyResponse
} from '../types/Hero'
import { api } from './api'

export class AuthApi {
    static createLobby = (request: CreateLobbyRequest) => {
        return api.post<CreateLobbyResponse>("/lobby/create", {
            userId: request.userId
        })
    }

    static joinLobby = (request: JoinLobbyRequest) => {
        return api.post<JoinLobbyResponse>("/lobby/join", {
            userId: request.userId,
            lobbyId: request.lobbyId
        })
    }

    static leaveLobby = (request: LeaveLobbyRequest) => {
        return api.post<LeaveLobbyResponse>("/lobby/leave", {
            userId: request.userId,
            lobbyId: request.lobbyId
        })
    }
}