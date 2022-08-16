export interface PartialSprint {
  title: string,
  description: string,
  deadline: number,
}

export interface Sprint extends PartialSprint{
  id: string,
  number: number,
  createdAt: number,
  updatedAt: number,
}
