import type { TodoModel } from '@components/todo/model.ts'

export const getDefaultTodo = (): TodoModel => ({
  text: '',
  id: new Date().valueOf(),
  completed: false,
})
