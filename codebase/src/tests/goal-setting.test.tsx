import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GoalsPage from '../pages/GoalsPage'
import type { Goal } from '../types/goal'
import type { Category } from '../types/category'

const seedGoals = (goals: Goal[]) => {
  window.localStorage.setItem('signal.goals', JSON.stringify(goals))
}

const seedCategories = (categories: Category[]) => {
  window.localStorage.setItem('signal.categories', JSON.stringify(categories))
}

describe('Goal setting', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('creates a yearly goal with a theme and custom category', async () => {
    seedGoals([])
    seedCategories([{ id: '1', name: 'Work', color: '#fff' }])

    const user = userEvent.setup()
    render(<GoalsPage />)

    await user.type(screen.getByLabelText(/goal name/i), 'Faithful mornings')
    await user.type(screen.getByLabelText(/description/i), '30-minute reflection routine')
    await user.selectOptions(screen.getByLabelText(/timeframe/i), 'Yearly')
    await user.selectOptions(screen.getByLabelText(/^theme$/i), 'Spiritual')
    await user.type(screen.getByLabelText(/progress/i), '75')

    await user.click(screen.getByRole('button', { name: /add goal/i }))

    expect(await screen.findByText('Faithful mornings')).toBeInTheDocument()
    expect(screen.getByText('Yearly goals')).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText(/new category/i), 'Ministry')
    await user.click(screen.getByRole('button', { name: /^Add$/i }))

    expect(screen.getByText('Ministry', { selector: 'span.tag' })).toBeInTheDocument()
  })
})
