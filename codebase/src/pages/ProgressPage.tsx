import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import { useTasks } from '../hooks/useTasks'
import { useGoals } from '../hooks/useGoals'
import { calculateCompletion, filterTasksByRange } from '../utils/progress'
import { getDayRange, getWeekRange } from '../utils/date'

const ProgressPage = () => {
  const { tasks } = useTasks()
  const { goals } = useGoals()
  const now = new Date()
  const { start: dayStart, end: dayEnd } = getDayRange(now)
  const { start: weekStart, end: weekEnd } = getWeekRange(now)

  const dailyTasks = filterTasksByRange(tasks, dayStart, dayEnd)
  const weeklyTasks = filterTasksByRange(tasks, weekStart, weekEnd)
  const monthlyTasks = filterTasksByRange(
    tasks,
    new Date(now.getFullYear(), now.getMonth(), 1),
    new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  )
  const yearlyTasks = filterTasksByRange(
    tasks,
    new Date(now.getFullYear(), 0, 1),
    new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999),
  )

  const dailyCompletion = calculateCompletion(dailyTasks)
  const weeklyCompletion = calculateCompletion(weeklyTasks)
  const monthlyCompletion = calculateCompletion(monthlyTasks)
  const yearlyCompletion = calculateCompletion(yearlyTasks)

  const goalCompletion = goals.length
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0

  return (
    <div className="page">
      <PageHeader
        title="Progress tracking"
        subtitle="Simple, calming dashboards across daily, weekly, monthly, and yearly horizons."
      />

      <section className="grid stats-grid">
        <StatCard label="Daily" value={`${dailyCompletion}%`} meta="Today’s task completion" />
        <StatCard label="Weekly" value={`${weeklyCompletion}%`} meta="This week’s momentum" />
        <StatCard label="Monthly" value={`${monthlyCompletion}%`} meta="Monthly consistency" />
        <StatCard label="Yearly" value={`${yearlyCompletion}%`} meta="Year-to-date completion" />
      </section>

      <section className="grid dashboard-grid">
        <div className="panel">
          <h2>Task completion overview</h2>
          <div className="progress-block">
            <div>
              <span>Daily</span>
              <ProgressBar value={dailyCompletion} />
            </div>
            <div>
              <span>Weekly</span>
              <ProgressBar value={weeklyCompletion} />
            </div>
            <div>
              <span>Monthly</span>
              <ProgressBar value={monthlyCompletion} />
            </div>
            <div>
              <span>Yearly</span>
              <ProgressBar value={yearlyCompletion} />
            </div>
          </div>
        </div>
        <div className="panel">
          <h2>Goals alignment</h2>
          <p className="muted">Average progress across all active goals.</p>
          <div className="goal-summary">
            <span className="metric">{goalCompletion}%</span>
            <ProgressBar value={goalCompletion} />
          </div>
          <div className="goal-tags">
            {goals.map((goal) => (
              <span key={goal.id} className="tag">
                {goal.title}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgressPage
