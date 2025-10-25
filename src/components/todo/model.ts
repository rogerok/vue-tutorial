export type StatusType = 'notStarted' | 'completed' | 'inProgress'

export interface TodoModel {
  text: string
  id: number
  status: StatusType
}

export interface StatusOptionModel {
  id: StatusType
  label: string
}
