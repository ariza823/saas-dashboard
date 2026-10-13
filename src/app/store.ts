import { configureStore } from '@reduxjs/toolkit'
import casesReducer from '../features/cases/casesSlice'
import themeReducer, { THEME_KEY } from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    cases: casesReducer,
    theme: themeReducer,
  },
})

// Persistimos solo el tema: el resto del estado es derivado de los datos mock.
store.subscribe(() => {
  try {
    localStorage.setItem(THEME_KEY, store.getState().theme.mode)
  } catch {
    /* modo privado o storage bloqueado: no pasa nada */
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
