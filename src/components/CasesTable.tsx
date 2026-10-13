import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectPagedCases, setPage, sortBy } from '../features/cases/casesSlice'
import type { CaseStatus, SortKey } from '../features/cases/types'
import { formatCOP, statusLabel } from '../utils'

const badge: Record<CaseStatus, string> = {
  activo: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  en_espera: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  cerrado: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

export function CasesTable() {
  const dispatch = useAppDispatch()
  const { rows, totalPages, total } = useAppSelector(selectPagedCases)
  const { page, sortKey, sortDir } = useAppSelector((s) => s.cases)

  const SortHeader = ({ k, children }: { k: SortKey; children: string }) => (
    <th
      scope="col"
      aria-sort={sortKey === k ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
      className="px-4 py-3"
    >
      <button type="button" onClick={() => dispatch(sortBy(k))} className="font-medium hover:underline">
        {children} {sortKey === k && (sortDir === 'asc' ? '↑' : '↓')}
      </button>
    </th>
  )

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Expediente</th>
              <SortHeader k="client">Cliente</SortHeader>
              <th scope="col" className="px-4 py-3 font-medium">Área</th>
              <th scope="col" className="px-4 py-3 font-medium">Estado</th>
              <SortHeader k="openedAt">Apertura</SortHeader>
              <SortHeader k="amount">Cuantía</SortHeader>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                <td className="px-4 py-3">{c.client}</td>
                <td className="px-4 py-3">{c.area}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${badge[c.status]}`}>{statusLabel[c.status]}</span>
                </td>
                <td className="px-4 py-3 tabular-nums">{c.openedAt}</td>
                <td className="px-4 py-3 tabular-nums">{formatCOP(c.amount)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  No hay casos que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm dark:border-slate-800">
        <span className="text-slate-500">{total} resultados</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
            className="rounded-md border px-2 py-1 disabled:opacity-40 dark:border-slate-700"
          >
            Anterior
          </button>
          <span className="tabular-nums">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
            className="rounded-md border px-2 py-1 disabled:opacity-40 dark:border-slate-700"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </section>
  )
}
