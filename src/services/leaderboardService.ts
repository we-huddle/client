import axios from "axios";
import {API} from "../constants";
import {LeaderboardPeriod, LeaderboardRecord} from "../types/LeaderboardRecord";

export class LeaderboardService {
  static async getLeaderboardRecordsByPeriod(period: LeaderboardPeriod): Promise<LeaderboardRecord[]> {
    try {
      const response = await axios.get<LeaderboardRecord[]>(
        `${API.BASE}/leaderboard/${period}`,
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`
          }
        }
      );
      return response.data
    } catch (e) {
      throw new Error();
    }
  }
}