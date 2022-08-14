export interface Task {
  id: string,
  title: string,
  description: string,
  type: Task.Type,
  details: string,
  createdAt: number,
  updatedAt: number,
}

export namespace Task {
  export enum Type {
    QUIZ, DEV
  }
}
