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

export interface Answer {
  id: string,
  profileId: string,
  taskId: string,
  details: DevTaskDetails | QuizTaskDetails,
  status: AnswerStatus,
  createdAt: number,
  updatedAt: number,
}

export interface QuizAnswerPayload {
  taskId: string,
  answers: Object,
}

export enum AnswerStatus {
  COMPLETED = "COMPLETED",
  INCOMPLETE = "INCOMPLETE"
}

export namespace Task {
  export enum Type {
    QUIZ = "QUIZ",
    DEV = "DEV",
  }
}
