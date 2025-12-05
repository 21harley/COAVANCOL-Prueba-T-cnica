/**
 * Tipos y constantes para el manejo de asociados en el frontend
 */

export interface Asociado {
  id: number;
  codigo: string;
  nombre: string;
  identificacion: string;
  estado_pipeline: EstadoPipeline;
  ultima_actualizacion: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UpdateEstadoRequest {
  asociadoId: number | string;
  nuevoEstado: EstadoPipeline;
}

export interface UpdateEstadoResponse {
  success: boolean;
  message: string;
  data?: Asociado;
}

export const ESTADOS_VALIDOS = [
  "Prospecto",
  "Expediente en Construcción",
  "Pendiente Jurídico",
  "Pendiente Cierre de Crédito",
  "Pendiente Firma y Litivo",
  "Pendiente Revisión Abogado",
  "Cartera Activa",
  "Desembolsado/Finalizado"
] as const;

export type EstadoPipeline = typeof ESTADOS_VALIDOS[number];

export const TRANSICIONES_VALIDAS: Record<EstadoPipeline, EstadoPipeline[]> = {
  "Prospecto": ["Expediente en Construcción"],
  "Expediente en Construcción": ["Pendiente Jurídico", "Pendiente Cierre de Crédito"],
  "Pendiente Jurídico": ["Expediente en Construcción", "Pendiente Revisión Abogado"],
  "Pendiente Cierre de Crédito": ["Pendiente Firma y Litivo"],
  "Pendiente Firma y Litivo": ["Pendiente Revisión Abogado", "Cartera Activa"],
  "Pendiente Revisión Abogado": ["Cartera Activa", "Desembolsado/Finalizado"],
  "Cartera Activa": ["Desembolsado/Finalizado"],
  "Desembolsado/Finalizado": []
};

/**
 * Interfaz para la respuesta de la API de listado de asociados
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Interfaz para la respuesta de error de la API
 */
export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
