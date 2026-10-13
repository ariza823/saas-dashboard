import type { CaseArea, CaseStatus, LegalCase } from './types'

// Datos ficticios generados de forma determinista (mismo resultado en cada carga).
const clients = ['Andrea Rojas', 'Carlos Pérez', 'Inversiones Delta', 'Laura Gómez', 'Transportes Andes', 'Miguel Torres', 'Café La Sabana', 'Diana Castro', 'Grupo Norte', 'Sofía Herrera', 'Juan Moreno', 'Ferretería El Tornillo']
const lawyers = ['M. Ruiz', 'J. Salazar', 'P. Vargas', 'L. Méndez']
const areas: CaseArea[] = ['Laboral', 'Civil', 'Comercial', 'Familia', 'Penal']
const statuses: CaseStatus[] = ['activo', 'activo', 'en_espera', 'cerrado']

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rand = seeded(42)
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)]

export const mockCases: LegalCase[] = Array.from({ length: 48 }, (_, i) => {
  const month = Math.floor(rand() * 12)
  const day = 1 + Math.floor(rand() * 27)
  return {
    id: `EXP-${String(1000 + i)}`,
    client: pick(clients),
    area: pick(areas),
    status: pick(statuses),
    lawyer: pick(lawyers),
    openedAt: new Date(2026, month, day).toISOString().slice(0, 10),
    amount: Math.round((2 + rand() * 98) * 1_000_000),
  }
})
