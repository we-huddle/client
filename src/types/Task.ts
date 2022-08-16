export interface PartialTask {
  title: string,
  description: string,
  type: Task.Type,
  details: DevTaskDetails,
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
