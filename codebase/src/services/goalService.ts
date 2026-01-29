import type { Goal } from '../types/goal'
import { createId } from '../utils/id'
import { toInputDate } from '../utils/date'
import { hasStorageKey, readStorage, writeStorage } from './storage'

const STORAGE_KEY = 'signal.goals'

const seedGoals = (): Goal[] => {
  const today = new Date()
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  return [
    {
      id: createId(),
      title: 'Yearly Resolution',
      description: 'Sustain a balanced growth year across health, focus, and learning.',
      timeframe: 'Yearly',
      theme: 'Spiritual',
      category: 'Personal Growth',
      progress: 62,
      targetDate: toInputDate(new Date(today.getFullYear(), 11, 31)),
    },
    {
      id: createId(),
      title: 'Monthly Goal',
      description: 'Design-system sprint with weekly reviews and cadence checks.',
      timeframe: 'Monthly',
      theme: 'Career',
      category: 'Work',
      progress: 48,
      targetDate: toInputDate(endOfMonth),
    },
    {
      id: createId(),
      title: 'Daily Objective',
      description: 'Two mindful breaks and one focused creative session.',
      timeframe: 'Daily',
      theme: 'Physical Fitness',
      category: 'Wellness',
      progress: 80,
    },
  ]
}

const ensureSeed = () => {
  const current = readStorage<Goal[]>(STORAGE_KEY, [])
  if (!hasStorageKey(STORAGE_KEY)) {
    const seeded = seedGoals()
    writeStorage(STORAGE_KEY, seeded)
    return seeded
  }
  return current
}

export const getGoals = () => {
  return ensureSeed()
}

export const saveGoals = (goals: Goal[]) => {
  writeStorage(STORAGE_KEY, goals)
}

export const createGoal = (goal: Omit<Goal, 'id'>) => {
  const goals = ensureSeed()
  const next = [{ ...goal, id: createId() }, ...goals]
  writeStorage(STORAGE_KEY, next)
  return next
}

export const updateGoal = (goalId: string, update: Partial<Goal>) => {
  const goals = ensureSeed()
  const next = goals.map((goal) => (goal.id === goalId ? { ...goal, ...update } : goal))
  writeStorage(STORAGE_KEY, next)
  return next
}

export const deleteGoal = (goalId: string) => {
  const goals = ensureSeed()
  const next = goals.filter((goal) => goal.id !== goalId)
  writeStorage(STORAGE_KEY, next)
  return next
}
