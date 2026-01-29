import type { Task } from '../types/task'

const isWithinRange = (value: Date, start: Date, end: Date) => value >= start && value <= end

export const calculateCompletion = (tasks: Task[]) => {
  if (!tasks.length) return 0
  const completed = tasks.filter((task) => task.completed).length
  return Math.round((completed / tasks.length) * 100)
}

export const filterTasksByRange = (tasks: Task[], start: Date, end: Date) => {
  return tasks.filter((task) => {
    const date = new Date(task.dueDate)
    return isWithinRange(date, start, end)
  })
}
