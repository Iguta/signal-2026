import { useEffect, useState } from 'react'
import type { Goal } from '../types/goal'
import * as goalService from '../services/goalService'

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    setGoals(goalService.getGoals())
  }, [])

  const createGoal = (goal: Omit<Goal, 'id'>) => {
    setGoals(goalService.createGoal(goal))
  }

  const updateGoal = (goalId: string, update: Partial<Goal>) => {
    setGoals(goalService.updateGoal(goalId, update))
  }

  const deleteGoal = (goalId: string) => {
    setGoals(goalService.deleteGoal(goalId))
  }

  return { goals, createGoal, updateGoal, deleteGoal }
}
