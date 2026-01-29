import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import { useTasks } from '../hooks/useTasks'
import { useGoals } from '../hooks/useGoals'
import { formatShortDate } from '../utils/date'
import { calculateCompletion } from '../utils/progress'

const DashboardPage = () => {
  const { tasks } = useTasks()
  const { goals } = useGoals()

  const upcoming = [...tasks]
    .filter((task) => !task.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4)

  const completion = calculateCompletion(tasks)
  const priorityCount = tasks.filter((task) => task.priority >= 4 && !task.completed).length
  const goalProgress = goals.length
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0

  return (
    <div className="page">
      <PageHeader
        title="Dashboard"
        subtitle="A calm, calendar-first view of your day, goals, and momentum."
        actions={
          <div className="header-actions">
            <Link className="chip" to="/tasks">
              Add task
            </Link>
            <Link className="chip ghost" to="/goals">
              Set goal
            </Link>
          </div>
        }
      />

      <section className="grid stats-grid">
        <StatCard label="Daily completion" value={`${completion}%`} meta="Task completion rate" />
        <StatCard label="High-priority items" value={`${priorityCount}`} meta="Priority 4+ tasks" />
        <StatCard label="Active goals" value={`${goals.length}`} meta="Across all timeframes" />
      </section>

      <section className="grid dashboard-grid">
        <div className="panel wide">
          <h2>Upcoming focus</h2>
          <p className="muted">Preview what needs attention in the next few days.</p>
          <div className="list">
            {upcoming.length === 0 && <p className="empty">No upcoming tasks yet.</p>}
            {upcoming.map((task) => (
              <div key={task.id} className="list-row">
                <div>
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                </div>
                <span className="pill">Due {formatShortDate(task.dueDate)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2>Goals pulse</h2>
          <p className="muted">Average progress across yearly, monthly, and daily focus areas.</p>
          <div className="goal-summary">
            <span className="metric">{goalProgress}%</span>
            <ProgressBar value={goalProgress} />
          </div>
          <div className="goal-tags">
            {goals.slice(0, 3).map((goal) => (
              <span key={goal.id} className="tag">
                {goal.theme}
              </span>
            ))}
          </div>
          <Link className="text-link" to="/progress">
            View full dashboard →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
