export const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

export const statusLabel = {
  activo: 'Activo',
  en_espera: 'En espera',
  cerrado: 'Cerrado',
} as const
