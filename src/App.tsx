import { useAppSelector } from './app/hooks'
import { CasesChart } from './components/CasesChart'
import { CasesTable } from './components/CasesTable'
import { Filters } from './components/Filters'
import { KpiCard } from './components/KpiCard'
import { ThemeToggle } from './components/ThemeToggle'
import { selectKpis } from './features/cases/casesSlice'
import { formatCOP } from './utils'

export default function App() {
  const kpis = useAppSelector(selectKpis)

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Panel de casos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Demo de dashboard SaaS · datos ficticios</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Indicadores">
        <KpiCard label="Casos" value={kpis.total} />
        <KpiCard label="Activos" value={kpis.active} />
        <KpiCard label="Cerrados" value={kpis.closed} />
        <KpiCard label="Cuantía total" value={formatCOP(kpis.amount)} />
      </section>

      <Filters />
      <CasesChart />
      <CasesTable />
    </div>
  )
}
