import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
  }

  return (
    <nav className="sticky top-0 z-50 h-14 flex items-center justify-between px-6 bg-surface-0/80 dark:bg-dark-0/80 backdrop-blur-sm border-b border-surface-200 dark:border-dark-300 transition-colors duration-200">
      
      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-base tracking-tight text-ink-primary dark:text-ink-dark-primary">
          Proposal
        </span>
        <span className="font-semibold text-base tracking-tight text-accent">AI</span>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm transition-colors ${isActive
              ? 'text-accent font-medium'
              : 'text-ink-secondary dark:text-ink-dark-secondary hover:text-ink-primary dark:hover:text-ink-dark-primary'
            }`
          }
        >
          Generator
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `text-sm transition-colors ${isActive
              ? 'text-accent font-medium'
              : 'text-ink-secondary dark:text-ink-dark-secondary hover:text-ink-primary dark:hover:text-ink-dark-primary'
            }`
          }
        >
          Settings
        </NavLink>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleTheme}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-secondary dark:text-ink-dark-secondary hover:text-ink-primary dark:hover:text-ink-dark-primary hover:bg-surface-100 dark:hover:bg-dark-200 transition-colors"
        aria-label="Toggle dark mode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="block dark:hidden w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden dark:block w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>

    </nav>
  )
}