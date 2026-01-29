import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TasksPage from '../pages/TasksPage'
import type { Task } from '../types/task'

const seedTasks = (tasks: Task[]) => {
  window.localStorage.setItem('signal.tasks', JSON.stringify(tasks))
}

describe('Task management', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('adds a task with priority and supports search', async () => {
    seedTasks([])
    const user = userEvent.setup()
    render(<TasksPage />)

    await user.type(screen.getByLabelText(/task title/i), 'Deep work block')
    await user.type(screen.getByLabelText(/description/i), '90-minute focus session')
    await user.selectOptions(screen.getByLabelText(/priority weight/i), '5')

    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByText('Deep work block')).toBeInTheDocument()
    expect(screen.getByText(/priority 5/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/search/i), 'deep work')
    expect(screen.getByText('Deep work block')).toBeInTheDocument()
  })
})
