import Statistics from "../types/Statistics";
import { api } from "./api";

export class StatisticsApi {
  static getStats = () => {
    return api.get<Statistics>("/stats");
  };
}