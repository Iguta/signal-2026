import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalendarPage from '../pages/CalendarPage'
import type { Task } from '../types/task'
import { toInputDate } from '../utils/date'

const seedTasks = (tasks: Task[]) => {
  window.localStorage.setItem('signal.tasks', JSON.stringify(tasks))
}

describe('Calendar integration', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('zooms into a day to reveal scheduled tasks', async () => {
    const reference = new Date()
    const targetDate = toInputDate(new Date(reference.getFullYear(), reference.getMonth(), 15))

    seedTasks([
      {
        id: '1',
        title: 'Study sprint',
        description: 'Complete module review',
        dueDate: targetDate,
        priority: 4,
        category: 'Academics',
        completed: false,
      },
    ])

    const user = userEvent.setup()
    render(<CalendarPage />)

    await user.click(screen.getByRole('button', { name: /15/i }))

    expect(screen.getByText('Study sprint')).toBeInTheDocument()
    expect(screen.getByText(/priority 4/i)).toBeInTheDocument()
  })
})
