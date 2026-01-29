import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import CalendarDay from '../components/CalendarDay'
import { useTasks } from '../hooks/useTasks'
import { getMonthDays, formatLongDate } from '../utils/date'

const CalendarPage = () => {
  const { tasks } = useTasks()
  const [month, setMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const { days } = getMonthDays(month)

  const tasksByDate = useMemo(() => {
    return tasks.reduce<Record<string, typeof tasks>>((acc, task) => {
      acc[task.dueDate] = acc[task.dueDate] ? [...acc[task.dueDate], task] : [task]
      return acc
    }, {})
  }, [tasks])

  const selectedTasks = selectedDate ? tasksByDate[selectedDate] ?? [] : []

  return (
    <div className="page">
      <PageHeader
        title="Calendar"
        subtitle="Zoom into any day to explore tasks and activity bursts."
        actions={
          <div className="header-actions">
            <button
              className="chip ghost"
              onClick={() => setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            >
              Previous
            </button>
            <button
              className="chip"
              onClick={() => setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            >
              Next
            </button>
          </div>
        }
      />

      <section className="grid calendar-grid">
        <div className="panel calendar-panel">
          <div className="month-label">
            {month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </div>
          <div className="calendar-grid-body">
            {days.map((day) => (
              <CalendarDay
                key={day.iso}
                date={day.iso}
                dayLabel={day.day}
                tasks={tasksByDate[day.iso] ?? []}
                isSelected={selectedDate === day.iso}
                onSelect={() => setSelectedDate(day.iso)}
              />
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="zoom-header">
            <div>
              <h2>Day focus</h2>
              <p className="muted">
                {selectedDate ? formatLongDate(selectedDate) : 'Select a day to zoom in'}
              </p>
            </div>
            {selectedDate && (
              <button className="chip ghost" onClick={() => setSelectedDate(null)}>
                Zoom out
              </button>
            )}
          </div>
          <div className="list">
            {selectedDate && selectedTasks.length === 0 && (
              <p className="empty">No tasks scheduled for this day.</p>
            )}
            {!selectedDate && <p className="empty">Pick a date to view tasks.</p>}
            {selectedTasks.map((task) => (
              <div key={task.id} className="list-row">
                <div>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                </div>
                <span className="pill">Priority {task.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CalendarPage
