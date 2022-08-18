import {GithubUser} from "./Issue";

export interface LeaderboardRecord {
  points: number,
  user: GithubUser,
}

export enum LeaderboardPeriod {
  current = "current",
  last = "last",
  all = "all",
}
