export interface TaskPayload {
  id: string,
  title: string,
  description: string,
  type: Task.Type,
  details: string,
  createdAt: number,
  updatedAt: number,
}

export interface Task {
  id: string,
  title: string,
  description: string,
  type: Task.Type,
  details: DevTaskDetails,
  createdAt: number,
  updatedAt: number,
}

export interface DevTaskDetails {
  noOfPulls: number
}

export namespace Task {
  export enum Type {
    QUIZ = "QUIZ",
    DEV = "DEV",
  }
}

export function TaskPayloadToTask(taskPayload: TaskPayload): Task {
  return {
    id: taskPayload.id,
    title: taskPayload.title,
    description: taskPayload.description,
    details: JSON.parse(taskPayload.details),
    type: taskPayload.type,
    createdAt: taskPayload.createdAt,
    updatedAt: taskPayload.updatedAt,
  }
}
