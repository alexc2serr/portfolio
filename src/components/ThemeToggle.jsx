import React from 'react'

export default function ThemeToggle ({ theme, setTheme }) {
  return (
    <div>
      <button
        aria-label="Toggle theme"
        className="theme-toggle"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  )
}
