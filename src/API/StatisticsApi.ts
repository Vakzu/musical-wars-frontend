import Statistics, { StatisticsRequest, StatisticsResponse } from "../types/Statistics"
import { api } from "./api"

export class StatisticsApi {
    static getStats = (request: StatisticsRequest) => {
        return api.get<StatisticsResponse>('/stats/' + request.userId)
    }
}