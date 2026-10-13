import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAppSelector } from '../app/hooks'
import { selectCasesByArea } from '../features/cases/casesSlice'

export function CasesChart() {
  const data = useAppSelector(selectCasesByArea)
  const dark = useAppSelector((s) => s.theme.mode === 'dark')
  const axis = dark ? '#94a3b8' : '#64748b'

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 font-medium">Casos por área</h2>
      {data.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate-500">Sin datos para estos filtros</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="area" stroke={axis} fontSize={12} />
              <YAxis allowDecimals={false} stroke={axis} fontSize={12} width={30} />
              <Tooltip
                cursor={{ fill: dark ? '#1e293b' : '#f1f5f9' }}
                contentStyle={{ background: dark ? '#0f172a' : '#fff', borderRadius: 8 }}
              />
              <Bar dataKey="total" name="Casos" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}
