export type GoalTimeframe = 'Yearly' | 'Monthly' | 'Daily'

export type Goal = {
  id: string
  title: string
  description: string
  timeframe: GoalTimeframe
  theme: string
  category: string
  progress: number
  targetDate?: string
}
