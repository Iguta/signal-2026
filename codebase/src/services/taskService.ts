import type { Task } from '../types/task'
import { createId } from '../utils/id'
import { toInputDate } from '../utils/date'
import { hasStorageKey, readStorage, writeStorage } from './storage'

const STORAGE_KEY = 'signal.tasks'

const seedTasks = (): Task[] => {
  const today = new Date()
  const inTwoDays = new Date(today)
  inTwoDays.setDate(today.getDate() + 2)
  const inFiveDays = new Date(today)
  inFiveDays.setDate(today.getDate() + 5)

  return [
    {
      id: createId(),
      title: 'Prepare quarterly review',
      description: 'Draft highlights and focus areas for the upcoming week.',
      dueDate: toInputDate(inTwoDays),
      priority: 4,
      category: 'Career',
      completed: false,
    },
    {
      id: createId(),
      title: 'Evening recovery ritual',
      description: 'Stretching, hydration, and a quiet reflection window.',
      dueDate: toInputDate(today),
      priority: 3,
      category: 'Physical Fitness',
      completed: true,
    },
    {
      id: createId(),
      title: 'Study sprint: design systems',
      description: 'Finish module 3 and capture notes for tomorrow.',
      dueDate: toInputDate(inFiveDays),
      priority: 5,
      category: 'Academics',
      completed: false,
    },
  ]
}

const ensureSeed = () => {
  const current = readStorage<Task[]>(STORAGE_KEY, [])
  if (!hasStorageKey(STORAGE_KEY)) {
    const seeded = seedTasks()
    writeStorage(STORAGE_KEY, seeded)
    return seeded
  }
  return current
}

export const getTasks = () => {
  return ensureSeed()
}

export const saveTasks = (tasks: Task[]) => {
  writeStorage(STORAGE_KEY, tasks)
}

export const createTask = (task: Omit<Task, 'id'>) => {
  const tasks = ensureSeed()
  const next = [{ ...task, id: createId() }, ...tasks]
  writeStorage(STORAGE_KEY, next)
  return next
}

export const updateTask = (taskId: string, update: Partial<Task>) => {
  const tasks = ensureSeed()
  const next = tasks.map((task) => (task.id === taskId ? { ...task, ...update } : task))
  writeStorage(STORAGE_KEY, next)
  return next
}

export const deleteTask = (taskId: string) => {
  const tasks = ensureSeed()
  const next = tasks.filter((task) => task.id !== taskId)
  writeStorage(STORAGE_KEY, next)
  return next
}
