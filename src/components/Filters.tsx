import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { resetFilters, setArea, setSearch, setStatus, type CasesState } from '../features/cases/casesSlice'

const fieldClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900'

export function Filters() {
  const dispatch = useAppDispatch()
  const { search, status, area } = useAppSelector((s) => s.cases)
  const [text, setText] = useState(search)

  // Debounce: no filtramos en cada tecla, esperamos 300 ms sin escribir.
  useEffect(() => {
    const id = setTimeout(() => dispatch(setSearch(text)), 300)
    return () => clearTimeout(id)
  }, [text, dispatch])

  // Si el estado global se resetea, el input local se sincroniza.
  useEffect(() => setText(search), [search])

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Buscar
        <input
          className={fieldClass}
          placeholder="Cliente o expediente"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Estado
        <select
          className={fieldClass}
          value={status}
          onChange={(e) => dispatch(setStatus(e.target.value as CasesState['status']))}
        >
          <option value="todos">Todos</option>
          <option value="activo">Activo</option>
          <option value="en_espera">En espera</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Área
        <select
          className={fieldClass}
          value={area}
          onChange={(e) => dispatch(setArea(e.target.value as CasesState['area']))}
        >
          <option value="todas">Todas</option>
          {['Laboral', 'Civil', 'Comercial', 'Familia', 'Penal'].map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() => dispatch(resetFilters())}
        className="rounded-lg px-3 py-2 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
      >
        Limpiar filtros
      </button>
    </div>
  )
}
