import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { toggleTheme } from '../features/theme/themeSlice'

export function ThemeToggle() {
  const mode = useAppSelector((s) => s.theme.mode)
  const dispatch = useAppDispatch()

  // La clase en <html> es la única fuente para el variant `dark:` de Tailwind.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      aria-label={`Cambiar a modo ${mode === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {mode === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
    </button>
  )
}
