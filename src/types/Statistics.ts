export default interface Statistics {
    playedGamesAmount: number,
    winsAmount: number,
    averagePlace: string,
    lastGameTimeStamp: string
}

export type StatisticsResponse = {
    statistics: Statistics
}