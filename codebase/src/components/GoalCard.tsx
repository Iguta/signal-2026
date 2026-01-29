import type { Goal } from '../types/goal'
import ProgressBar from './ProgressBar'
import Tag from './Tag'
import { formatShortDate } from '../utils/date'

type GoalCardProps = {
  goal: Goal
  onEdit: () => void
  onDelete: () => void
}

const GoalCard = ({ goal, onEdit, onDelete }: GoalCardProps) => {
  return (
    <article className="goal-card">
      <div className="goal-header">
        <div>
          <p className="pill">{goal.timeframe}</p>
          <h3>{goal.title}</h3>
        </div>
        <Tag label={goal.theme} />
      </div>
      <p className="goal-description">{goal.description}</p>
      <div className="goal-meta">
        <span>{goal.category}</span>
        {goal.targetDate && <span>Target {formatShortDate(goal.targetDate)}</span>}
      </div>
      <ProgressBar value={goal.progress} />
      <div className="goal-actions">
        <button className="chip ghost" onClick={onEdit}>
          Update
        </button>
        <button className="chip danger" onClick={onDelete}>
          Remove
        </button>
      </div>
    </article>
  )
}

export default GoalCard
