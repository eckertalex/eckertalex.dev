import React from 'react'
import useDarkMode from 'use-dark-mode'
/* -------------------------------------------------------------------------- */

export default function ThemeToggle() {
  const {value: isDark, toggle: toggleTheme} = useDarkMode()

  function setDarkModeTransition() {
    document.documentElement.classList.add('theme-transition')
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 500)
  }

  return (
    <label htmlFor="theme-toggle" className="theme-toggle">
      <input
        id="theme-toggle"
        type="checkbox"
        checked={isDark}
        onChange={() => {
          setDarkModeTransition()
          toggleTheme()
        }}
      />
      <div />
    </label>
  )
}
