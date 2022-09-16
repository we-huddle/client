import {Task} from "./Task";

export interface PartialBadge {
  title: string,
  description: string,
  photo: string,
  depBadges: string[],
  depTasks: string[],
}

export interface BadgeDto extends PartialBadge {
  id: string,
  createdAt: number,
  updatedAt: number,
}

export interface BadgeWithDependencies {
  id: string,
  title: string,
  description: string,
  photo: string,
  depBadges: BadgeDto[],
  depTasks: Task[],
  createdAt: number,
  updatedAt: number,
}
