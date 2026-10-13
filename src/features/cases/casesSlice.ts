import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { mockCases } from './mockCases'
import type { CaseArea, CaseStatus, LegalCase, SortDir, SortKey } from './types'

export const PAGE_SIZE = 8

export interface CasesState {
  items: LegalCase[]
  search: string
  status: CaseStatus | 'todos'
  area: CaseArea | 'todas'
  sortKey: SortKey
  sortDir: SortDir
  page: number
}

export const initialState: CasesState = {
  items: mockCases,
  search: '',
  status: 'todos',
  area: 'todas',
  sortKey: 'openedAt',
  sortDir: 'desc',
  page: 1,
}

const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1
    },
    setStatus(state, action: PayloadAction<CasesState['status']>) {
      state.status = action.payload
      state.page = 1
    },
    setArea(state, action: PayloadAction<CasesState['area']>) {
      state.area = action.payload
      state.page = 1
    },
    // Clic en la misma columna invierte la dirección; en otra columna arranca en asc.
    sortBy(state, action: PayloadAction<SortKey>) {
      if (state.sortKey === action.payload) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortKey = action.payload
        state.sortDir = 'asc'
      }
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    resetFilters(state) {
      return { ...initialState, items: state.items }
    },
  },
})

export const { setSearch, setStatus, setArea, sortBy, setPage, resetFilters } = casesSlice.actions
export default casesSlice.reducer

// ---------- Selectores memorizados ----------
const selectCasesState = (state: RootState) => state.cases

export const selectFilteredCases = createSelector([selectCasesState], (s) => {
  const q = s.search.trim().toLowerCase()
  const filtered = s.items.filter(
    (c) =>
      (s.status === 'todos' || c.status === s.status) &&
      (s.area === 'todas' || c.area === s.area) &&
      (q === '' || c.client.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)),
  )
  const dir = s.sortDir === 'asc' ? 1 : -1
  return [...filtered].sort((a, b) => {
    const av = a[s.sortKey]
    const bv = b[s.sortKey]
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
    return String(av).localeCompare(String(bv), 'es') * dir
  })
})

export const selectPagedCases = createSelector(
  [selectFilteredCases, (state: RootState) => state.cases.page],
  (cases, page) => ({
    rows: cases.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    totalPages: Math.max(1, Math.ceil(cases.length / PAGE_SIZE)),
    total: cases.length,
  }),
)

export const selectKpis = createSelector([selectFilteredCases], (cases) => ({
  total: cases.length,
  active: cases.filter((c) => c.status === 'activo').length,
  closed: cases.filter((c) => c.status === 'cerrado').length,
  amount: cases.reduce((acc, c) => acc + c.amount, 0),
}))

export const selectCasesByArea = createSelector([selectFilteredCases], (cases) => {
  const map = new Map<string, number>()
  cases.forEach((c) => map.set(c.area, (map.get(c.area) ?? 0) + 1))
  return [...map.entries()].map(([area, total]) => ({ area, total }))
})
