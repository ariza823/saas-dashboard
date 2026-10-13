export type CaseStatus = 'activo' | 'en_espera' | 'cerrado'
export type CaseArea = 'Laboral' | 'Civil' | 'Comercial' | 'Familia' | 'Penal'

export interface LegalCase {
  id: string
  client: string
  area: CaseArea
  status: CaseStatus
  lawyer: string
  openedAt: string // ISO date
  amount: number // COP
}

export type SortKey = 'client' | 'openedAt' | 'amount'
export type SortDir = 'asc' | 'desc'
