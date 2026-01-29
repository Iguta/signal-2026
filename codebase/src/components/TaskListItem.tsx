import type { Task } from '../types/task'
import { formatShortDate } from '../utils/date'
import Tag from './Tag'

type TaskListItemProps = {
  task: Task
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}

const TaskListItem = ({ task, onToggle, onEdit, onDelete }: TaskListItemProps) => {
  return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <label className="task-check">
          <input type="checkbox" checked={task.completed} onChange={onToggle} />
          <span className="checkmark" />
        </label>
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="task-meta">
            <Tag label={task.category} />
            <span>Due {formatShortDate(task.dueDate)}</span>
            <span>Priority {task.priority}</span>
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className="chip ghost" onClick={onEdit}>
          Edit
        </button>
        <button className="chip danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskListItem
