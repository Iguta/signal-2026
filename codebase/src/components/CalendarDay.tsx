import type { Task } from '../types/task'
import { formatShortDate } from '../utils/date'

type CalendarDayProps = {
  date: string
  dayLabel: number
  tasks: Task[]
  isSelected: boolean
  onSelect: () => void
}

const CalendarDay = ({ date, dayLabel, tasks, isSelected, onSelect }: CalendarDayProps) => {
  return (
    <button type="button" className={`calendar-day ${isSelected ? 'active' : ''}`} onClick={onSelect}>
      <div className="calendar-day-header">
        <span>{dayLabel}</span>
        <span className="calendar-count">{tasks.length}</span>
      </div>
      <p>{tasks.length ? `${tasks.length} focus items` : 'Open space'}</p>
      <span className="calendar-date">{formatShortDate(date)}</span>
    </button>
  )
}

export default CalendarDay
