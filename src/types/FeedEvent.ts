import {Profile} from "./Profile";

export enum FeedEventType {
  FOLLOWER = "FOLLOWER",
  BADGE = "BADGE",
  TASK = "TASK",
}

export interface FeedEvent {
  id: string,
  profile: Profile,
  title: String,
  type: FeedEventType,
  referenceId: string,
  createdAt: number,
  updatedAt: number,
}
