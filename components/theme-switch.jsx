import {useTheme} from 'next-themes'

export function ThemeSwitch() {
  const {theme, setTheme} = useTheme()

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  function setDarkModeTransition() {
    document.documentElement.classList.add('theme-transition')
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 500)
  }

  return (
    <label htmlFor="theme-toggle" className="theme-toggle">
      <input
        id="theme-toggle"
        type="checkbox"
        checked={theme === 'dark'}
        onChange={() => {
          setDarkModeTransition()
          toggleTheme()
        }}
      />
      <div />
    </label>
  )
}
