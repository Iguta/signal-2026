import { useEffect, useMemo, useState } from 'react'
import type { Task } from '../types/task'
import * as taskService from '../services/taskService'

export type TaskFilters = {
  query: string
  sort: 'priority' | 'dueDate' | 'created'
  showCompleted: boolean
}

const sortTasks = (tasks: Task[], sort: TaskFilters['sort']) => {
  const sorted = [...tasks]
  if (sort === 'priority') {
    sorted.sort((a, b) => b.priority - a.priority)
  } else if (sort === 'dueDate') {
    sorted.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }
  return sorted
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filters, setFilters] = useState<TaskFilters>({
    query: '',
    sort: 'priority',
    showCompleted: true,
  })

  useEffect(() => {
    setTasks(taskService.getTasks())
  }, [])

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase()
    const base = filters.showCompleted ? tasks : tasks.filter((task) => !task.completed)
    const searched = query
      ? base.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query) ||
            task.category.toLowerCase().includes(query),
        )
      : base
    return sortTasks(searched, filters.sort)
  }, [tasks, filters])

  const createTask = (task: Omit<Task, 'id'>) => {
    setTasks(taskService.createTask(task))
  }

  const updateTask = (taskId: string, update: Partial<Task>) => {
    setTasks(taskService.updateTask(taskId, update))
  }

  const deleteTask = (taskId: string) => {
    setTasks(taskService.deleteTask(taskId))
  }

  return {
    tasks,
    filtered,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
  }
}
