/**
 * Tipos comunes relacionados con la entidad Asociado
 * Estos tipos son compartidos entre frontend y backend
 */

export const ESTADOS_VALIDOS = [
  "Prospecto",
  "Expediente en Construcción",
  "Pendiente Jurídico",
  "Pendiente Cierre de Crédito",
  "Pendiente Firma y Litivo",
  "Pendiente Revisión Abogado",
  "Cartera Activa",
  "Desembolsado/Finalizado"
] as const

export type EstadoPipeline = typeof ESTADOS_VALIDOS[number]

export const TRANSICIONES_VALIDAS: Record<EstadoPipeline, EstadoPipeline[]> = {
  "Prospecto": ["Expediente en Construcción"],
  "Expediente en Construcción": ["Pendiente Jurídico", "Pendiente Cierre de Crédito"],
  "Pendiente Jurídico": ["Expediente en Construcción", "Pendiente Revisión Abogado"],
  "Pendiente Cierre de Crédito": ["Pendiente Firma y Litivo"],
  "Pendiente Firma y Litivo": ["Pendiente Revisión Abogado", "Cartera Activa"],
  "Pendiente Revisión Abogado": ["Cartera Activa", "Desembolsado/Finalizado"],
  "Cartera Activa": ["Desembolsado/Finalizado"],
  "Desembolsado/Finalizado": []
}

// Interfaces compartidas
export interface Asociado {
  id: number
  codigo: string
  nombre: string
  identificacion: string
  estado_pipeline: string
  ultima_actualizacion: Date
  createdAt: Date
  updatedAt: Date
}

export interface UpdateEstadoRequest {
  asociadoId: number | string
  nuevoEstado: EstadoPipeline
}

export interface UpdateEstadoResponse {
  success: boolean
  message: string
  data?: Asociado
}
