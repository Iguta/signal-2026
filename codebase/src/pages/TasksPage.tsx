import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import TaskListItem from '../components/TaskListItem'
import { useTasks } from '../hooks/useTasks'
import { useCategories } from '../hooks/useCategories'
import type { TaskPriority } from '../types/task'
import { toInputDate } from '../utils/date'

const priorityOptions: TaskPriority[] = [5, 4, 3, 2, 1]

const TasksPage = () => {
  const { filtered, tasks, filters, setFilters, createTask, updateTask, deleteTask } = useTasks()
  const { categories } = useCategories()
  const [editingId, setEditingId] = useState<string | null>(null)
  const editingTask = tasks.find((task) => task.id === editingId)
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: toInputDate(new Date()),
    priority: 3 as TaskPriority,
    category: 'Work',
  })

  const categoryOptions = useMemo(
    () => (categories.length ? categories.map((category) => category.name) : ['Work']),
    [categories],
  )

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      dueDate: toInputDate(new Date()),
      priority: 3,
      category: categoryOptions[0] ?? 'Work',
    })
    setEditingId(null)
  }

  const isEditing = Boolean(editingTask)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.title.trim()) return

    if (editingTask) {
      updateTask(editingTask.id, {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        priority: form.priority,
        category: form.category,
      })
    } else {
      createTask({
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        priority: form.priority,
        category: form.category,
        completed: false,
      })
    }

    resetForm()
  }

  const handleEdit = (taskId: string) => {
    const task = tasks.find((entry) => entry.id === taskId)
    if (!task) return
    setEditingId(taskId)
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category,
    })
  }

  return (
    <div className="page">
      <PageHeader
        title="Task management"
        subtitle="Capture, prioritize, and track every task with calm clarity."
      />

      <section className="grid task-grid">
        <form className="panel form" onSubmit={handleSubmit}>
          <h2>{isEditing ? 'Edit task' : 'Add task'}</h2>
          <label>
            Task title
            <input
              type="text"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Write a clear action"
            />
          </label>
          <label>
            Description
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Add a note or context"
            />
          </label>
          <div className="split">
            <label>
              Due date
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
              />
            </label>
            <label>
              Priority weight
              <select
                value={form.priority}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, priority: Number(event.target.value) as TaskPriority }))
                }
              >
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
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
          <div className="form-actions">
            <button className="chip" type="submit">
              {isEditing ? 'Save updates' : 'Add task'}
            </button>
            {isEditing && (
              <button className="chip ghost" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="panel">
          <div className="filters">
            <div>
              <label htmlFor="task-search">Search</label>
              <input
                id="task-search"
                type="search"
                value={filters.query}
                onChange={(event) => setFilters((prev) => ({ ...prev, query: event.target.value }))}
                placeholder="Search tasks"
              />
            </div>
            <div>
              <label>Sort by</label>
              <select
                value={filters.sort}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, sort: event.target.value as 'priority' | 'dueDate' }))
                }
              >
                <option value="priority">Priority</option>
                <option value="dueDate">Due date</option>
              </select>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={filters.showCompleted}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, showCompleted: event.target.checked }))
                }
              />
              <span>Show completed</span>
            </label>
          </div>

          <div className="list">
            {filtered.length === 0 && <p className="empty">No tasks match your filters yet.</p>}
            {filtered.map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
                onToggle={() => updateTask(task.id, { completed: !task.completed })}
                onEdit={() => handleEdit(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TasksPage
