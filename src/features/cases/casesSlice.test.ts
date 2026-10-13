import { configureStore } from '@reduxjs/toolkit'
import { describe, expect, it } from 'vitest'
import casesReducer, {
  PAGE_SIZE,
  initialState,
  selectFilteredCases,
  selectPagedCases,
  setSearch,
  setStatus,
  sortBy,
} from './casesSlice'
import themeReducer from '../theme/themeSlice'
import type { LegalCase } from './types'

const sample: LegalCase[] = [
  { id: 'EXP-1', client: 'Beta', area: 'Civil', status: 'activo', lawyer: 'A', openedAt: '2026-01-10', amount: 300 },
  { id: 'EXP-2', client: 'Alfa', area: 'Laboral', status: 'cerrado', lawyer: 'B', openedAt: '2026-03-05', amount: 100 },
  { id: 'EXP-3', client: 'Gamma', area: 'Civil', status: 'activo', lawyer: 'A', openedAt: '2026-02-01', amount: 200 },
]

const makeStore = (items = sample) =>
  configureStore({
    reducer: { cases: casesReducer, theme: themeReducer },
    preloadedState: { cases: { ...initialState, items } },
  })

describe('casesSlice', () => {
  it('filtra por estado', () => {
    const store = makeStore()
    store.dispatch(setStatus('activo'))
    expect(selectFilteredCases(store.getState()).map((c) => c.id)).toEqual(['EXP-3', 'EXP-1'])
  })

  it('busca por cliente sin importar mayúsculas', () => {
    const store = makeStore()
    store.dispatch(setSearch('ALF'))
    expect(selectFilteredCases(store.getState())).toHaveLength(1)
  })

  it('ordena por cuantía y alterna la dirección', () => {
    const store = makeStore()
    store.dispatch(sortBy('amount'))
    expect(selectFilteredCases(store.getState()).map((c) => c.amount)).toEqual([100, 200, 300])
    store.dispatch(sortBy('amount'))
    expect(selectFilteredCases(store.getState()).map((c) => c.amount)).toEqual([300, 200, 100])
  })

  it('pagina los resultados', () => {
    const many = Array.from({ length: PAGE_SIZE + 3 }, (_, i) => ({ ...sample[0], id: `EXP-${i}` }))
    const store = makeStore(many)
    expect(selectPagedCases(store.getState()).totalPages).toBe(2)
  })
})
