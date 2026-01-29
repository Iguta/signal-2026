import './App.css'

const focusPillars = [
  {
    label: 'Daily tasks',
    value: '18',
    detail: '5timed priorities',
  },
  {
    label: 'Weekly streak',
    value: '12 days',
    detail: 'on track',
  },
  {
    label: 'Monthly progress',
    value: '72%',
    detail: 'toward your core goal',
  },
]

const taskHighlights = [
  {
    title: 'Flow & Focus',
    description: 'Block paired sessions from 8:30–11:00 to keep momentum.',
    detail: 'Deep work focus',
    completion: 0.78,
  },
  {
    title: 'Mindful Breaks',
    description: 'Disperse 3 short walks anchored to breathing cues.',
    detail: 'Physical & mental reset',
    completion: 0.5,
  },
]

const goalThemes = [
  {
    title: 'Yearly Resolution',
    headline: 'Sustain a balanced growth year',
    points: ['Finish 2 major projects', 'Support learning routine', 'Protect rest days'],
  },
  {
    title: 'Monthly Focus',
    headline: 'Design-system sprint',
    points: ['Ship refined theme tokens', 'Document component usage', 'Hold weekly review'],
  },
]

const calendarDays = Array.from({ length: 14 }).map((_, index) => ({
  day: index + 1,
  tasks: Math.floor(Math.random() * 3),
  intensity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
}))

const dashboardInsights = [
  {
    label: 'Weekly impact',
    value: '64%',
    detail: 'Time spent on signature goals'
  },
  {
    label: 'Focus score',
    value: '8.5 / 10',
    detail: 'Average concentration rating'
  },
  {
    label: 'Energy balance',
    value: '+12%',
    detail: 'More rest vs. last month'
  },
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">signal-2026 · Personal productivity</p>
          <h1>Calmly orchestrate goals, tasks, and calendar rhythm.</h1>
          <p className="intro">
            Calendar-first visibility, thematic goal tracking, and gentle dashboards that keep you
            aware without draining energy.
          </p>
          <div className="hero-actions">
            <button className="primary">Open my dashboard</button>
            <button className="ghost">Walk through the flow</button>
          </div>
        </div>
        <div className="hero-stats">
          {focusPillars.map((pillar) => (
            <div key={pillar.label} className="stat">
              <p className="stat-label">{pillar.label}</p>
              <p className="stat-value">{pillar.value}</p>
              <p className="stat-detail">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="section tasks">
        <h2>Task rhythm & priorities</h2>
        <div className="tasks-grid">
          {taskHighlights.map((task) => (
            <article key={task.title} className="panel">
              <div className="panel-header">
                <span className="pill">{task.detail}</span>
                <strong>{task.title}</strong>
              </div>
              <p>{task.description}</p>
              <div className="progress-bar">
                <span style={{ width: `${task.completion * 100}%` }} />
              </div>
            </article>
          ))}
          <article className="panel calendar-panel">
            <h3>Calendar view</h3>
            <p>Zoom into any two-week span to see tasks, focus blocks, and energy dips.</p>
            <div className="calendar-grid">
              {calendarDays.map((day) => (
                <div key={day.day} className={`calendar-day ${day.intensity}`}>
                  <span className="day-number">{day.day}</span>
                  <div className="task-dots">
                    {Array.from({ length: day.tasks }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section goals">
        <h2>Goals & themes</h2>
        <div className="goals-grid">
          {goalThemes.map((theme) => (
            <article key={theme.title} className="panel">
              <p className="pill">{theme.title}</p>
              <h3>{theme.headline}</h3>
              <ul>
                {theme.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="panel insight-panel">
            <h3>Theme pulse</h3>
            <p>Rotate through Spiritual, Physical, Academics, Career weekly with calm reminders.</p>
            <div className="pulse">
              <span>Spiritual</span>
              <span>Physical</span>
              <span>Academics</span>
              <span>Career</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section dashboards">
        <h2>Progress dashboards</h2>
        <div className="dash-grid">
          {dashboardInsights.map((insight) => (
            <article key={insight.label} className="panel">
              <p className="stat-label">{insight.label}</p>
              <p className="stat-value">{insight.value}</p>
              <p>{insight.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
