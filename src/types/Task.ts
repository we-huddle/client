export interface PartialTask {
  title: string,
  description: string,
  type: Task.Type,
  details: DevTaskDetails | QuizTaskDetails,
}

export interface Task {
  id: string,
  title: string,
  description: string,
  type: Task.Type,
  details: DevTaskDetails | QuizTaskDetails,
  createdAt: number,
  updatedAt: number,
}

export interface DevTaskDetails {
  noOfPulls: number
}

export interface QuizTaskDetails {
  passMark: number,
  questions: Question[],
}

export interface Question {
  number: number,
  question: string,
  correctAnswerKey: string,
  options: {
    a: string,
    b: string,
    c: string,
    d: string,
  },
}

export namespace Task {
  export enum Type {
    QUIZ = "QUIZ",
    DEV = "DEV",
  }
}
