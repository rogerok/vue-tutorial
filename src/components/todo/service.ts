import type { StatusOptionModel, StatusType, TodoModel } from '@components/todo/model.ts'

export const getDefaultTodo = (): TodoModel => ({
  text: '',
  id: new Date().valueOf(),
  status: 'notStarted',
})

export const getStatusList = (): StatusOptionModel[] =>
  [
    { id: 'notStarted', label: 'Not started' },
    { id: 'inProgress', label: 'In progress' },
    { id: 'completed', label: 'Completed' },
  ] as const

export const makeCopy = <T>(item: T): T => ({ ...item })

export const toggleStatus = (status: StatusType): StatusType => {
  console.log(status)

  switch (status) {
    case 'notStarted':
      return 'inProgress'
    case 'inProgress':
      return 'completed'
    case 'completed':
      return 'inProgress'
  }
}
