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
    <label className="theme-toggle" htmlFor="theme-toggle">
      <input
        checked={theme === 'dark'}
        id="theme-toggle"
        onChange={() => {
          setDarkModeTransition()
          toggleTheme()
        }}
        type="checkbox"
      />
      <div />
    </label>
  )
}
