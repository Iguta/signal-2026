export type TaskPriority = 1 | 2 | 3 | 4 | 5

export type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  priority: TaskPriority
  category: string
  completed: boolean
}
