import { createSlice } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'
export const THEME_KEY = 'saas-dashboard:theme'

function getInitialMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialMode() as ThemeMode },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
