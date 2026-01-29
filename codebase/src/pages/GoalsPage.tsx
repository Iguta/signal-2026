import { useMemo, useState, type FormEvent, type MouseEvent } from 'react'
import PageHeader from '../components/PageHeader'
import GoalCard from '../components/GoalCard'
import { useGoals } from '../hooks/useGoals'
import { useCategories } from '../hooks/useCategories'
import { DEFAULT_THEMES } from '../types/category'
import type { GoalTimeframe } from '../types/goal'

const timeframeOptions: GoalTimeframe[] = ['Yearly', 'Monthly', 'Daily']

const GoalsPage = () => {
  const { goals, createGoal, updateGoal, deleteGoal } = useGoals()
  const { categories, createCategory } = useCategories()
  const [editingId, setEditingId] = useState<string | null>(null)
  const editingGoal = goals.find((goal) => goal.id === editingId)
  const [form, setForm] = useState({
    title: '',
    description: '',
    timeframe: 'Monthly' as GoalTimeframe,
    theme: DEFAULT_THEMES[0],
    category: 'Work',
    progress: 40,
    targetDate: '',
  })
  const [newCategory, setNewCategory] = useState('')

  const categoryOptions = useMemo(
    () => (categories.length ? categories.map((category) => category.name) : ['Work']),
    [categories],
  )

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      timeframe: 'Monthly',
      theme: DEFAULT_THEMES[0],
      category: categoryOptions[0] ?? 'Work',
      progress: 40,
      targetDate: '',
    })
    setEditingId(null)
  }

  const themeOptions = useMemo(() => {
    return Array.from(new Set([...DEFAULT_THEMES, ...categoryOptions]))
  }, [categoryOptions])

  const grouped = useMemo(() => {
    return timeframeOptions.map((timeframe) => ({
      timeframe,
      items: goals.filter((goal) => goal.timeframe === timeframe),
    }))
  }, [goals])

  const submitGoal = () => {
    if (!form.title.trim()) return

    if (editingGoal) {
      updateGoal(editingGoal.id, { ...form })
    } else {
      createGoal({ ...form })
    }
    resetForm()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitGoal()
  }

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    submitGoal()
  }

  const handleEdit = (goalId: string) => {
    const goal = goals.find((item) => item.id === goalId)
    if (!goal) return
    setEditingId(goalId)
    setForm({
      title: goal.title,
      description: goal.description,
      timeframe: goal.timeframe,
      theme: goal.theme,
      category: goal.category,
      progress: goal.progress,
      targetDate: goal.targetDate ?? '',
    })
  }

  return (
    <div className="page">
      <PageHeader
        title="Goal setting"
        subtitle="Define yearly resolutions, monthly milestones, and daily intentions."
      />

      <section className="grid goal-grid">
        <form className="panel form" onSubmit={handleSubmit}>
          <h2>{editingGoal ? 'Update goal' : 'Create goal'}</h2>
          <label>
            Goal name
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Write a clear intention"
            />
          </label>
          <label>
            Description
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Add supportive detail"
            />
          </label>
          <div className="split">
            <label>
              Timeframe
              <select
                value={form.timeframe}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, timeframe: event.target.value as GoalTimeframe }))
                }
              >
                {timeframeOptions.map((frame) => (
                  <option key={frame} value={frame}>
                    {frame}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Theme
              <select
                value={form.theme}
                onChange={(event) => setForm((prev) => ({ ...prev, theme: event.target.value }))}
              >
                {themeOptions.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Progress (%)
            <input
              type="number"
              min={0}
              max={100}
              value={form.progress}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, progress: Number(event.target.value) }))
              }
            />
          </label>
          <label>
            Target date (optional)
            <input
              type="date"
              value={form.targetDate}
              onChange={(event) => setForm((prev) => ({ ...prev, targetDate: event.target.value }))}
            />
          </label>
          <div className="form-actions">
            <button className="chip" type="button" onClick={handleAddClick}>
              {editingGoal ? 'Save goal' : 'Add goal'}
            </button>
            {editingGoal && (
              <button className="chip ghost" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="panel">
          <div className="category-card">
            <h2>Custom categories</h2>
            <p className="muted">Add categories for tasks and goals to stay aligned.</p>
            <div className="category-form">
              <input
                type="text"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                placeholder="New category"
              />
              <button
                type="button"
                className="chip"
                onClick={() => {
                  if (!newCategory.trim()) return
                  createCategory(newCategory)
                  setNewCategory('')
                }}
              >
                Add
              </button>
            </div>
            <div className="category-list">
              {categoryOptions.map((category) => (
                <span key={category} className="tag">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="goal-list">
            {grouped.map((group) => (
              <div key={group.timeframe} className="goal-group">
                <h3>{group.timeframe} goals</h3>
                <div className="goal-cards">
                  {group.items.length === 0 && <p className="empty">No goals yet.</p>}
                  {group.items.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onEdit={() => handleEdit(goal.id)}
                      onDelete={() => deleteGoal(goal.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default GoalsPage
