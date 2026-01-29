import { render, screen, within } from '@testing-library/react'
import ProgressPage from '../pages/ProgressPage'
import type { Task } from '../types/task'
import type { Goal } from '../types/goal'
import { toInputDate } from '../utils/date'

const seedTasks = (tasks: Task[]) => {
  window.localStorage.setItem('signal.tasks', JSON.stringify(tasks))
}

const seedGoals = (goals: Goal[]) => {
  window.localStorage.setItem('signal.goals', JSON.stringify(goals))
}

describe('Progress tracking', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows daily, weekly, monthly, and yearly progress metrics', () => {
    const today = toInputDate(new Date())
    seedTasks([
      {
        id: '1',
        title: 'Daily focus',
        description: 'One focus block',
        dueDate: today,
        priority: 3,
        category: 'Work',
        completed: true,
      },
      {
        id: '2',
        title: 'Daily reset',
        description: 'Mindful break',
        dueDate: today,
        priority: 2,
        category: 'Wellness',
        completed: false,
      },
    ])

    seedGoals([
      {
        id: 'g1',
        title: 'Monthly rhythm',
        description: 'Keep the cadence steady',
        timeframe: 'Monthly',
        theme: 'Career',
        category: 'Work',
        progress: 80,
      },
    ])

    render(<ProgressPage />)

    const dailyCard = screen.getByText('Daily', { selector: 'p.stat-label' }).closest('article')
    expect(dailyCard).toBeInTheDocument()
    expect(within(dailyCard as HTMLElement).getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('Goals alignment')).toBeInTheDocument()
    expect(screen.getByText('80%')).toBeInTheDocument()
  })
})
