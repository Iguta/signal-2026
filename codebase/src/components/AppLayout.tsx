import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Goals', to: '/goals' },
  { label: 'Calendar', to: '/calendar' },
  { label: 'Progress', to: '/progress' },
]

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="brand">
          <span className="brand-dot" />
          <div>
            <p className="brand-title">signal-2026</p>
            <p className="brand-subtitle">Personal clarity workspace</p>
          </div>
        </div>
        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="chip">Focus mode</button>
          <button className="chip ghost">Sync summary</button>
        </div>
      </header>
      <main className="app-content">{children}</main>
    </div>
  )
}

export default AppLayout
