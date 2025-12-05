import type { Asociado, EstadoPipeline, UpdateEstadoRequest, UpdateEstadoResponse } from '../core/types/asociado';

const API_BASE_URL = 'http://localhost:3000/api/v1';

/**
 * Obtiene todos los asociados
 */
export const getAsociados = async (): Promise<Asociado[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/asociados`);
    if (!response.ok) {
      throw new Error('Error al obtener los asociados');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error en getAsociados:', error);
    throw error;
  }
};

/**
 * Obtiene un asociado por su ID
 */
export const getAsociadoById = async (id: number | string): Promise<Asociado> => {
  try {
    const response = await fetch(`${API_BASE_URL}/asociados/${id}`);
    if (!response.ok) {
      throw new Error('Asociado no encontrado');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error al obtener el asociado con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo asociado
 */
export const createAsociado = async (asociado: Omit<Asociado, 'id' | 'createdAt' | 'updatedAt' | 'ultima_actualizacion'>): Promise<Asociado> => {
  try {
    const response = await fetch(`${API_BASE_URL}/asociados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(asociado),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear el asociado');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error al crear el asociado:', error);
    throw error;
  }
};

/**
 * Actualiza el estado de un asociado
 */
export const updateEstadoAsociado = async (request: UpdateEstadoRequest): Promise<UpdateEstadoResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/asociados/update-estado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el estado del asociado');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el estado del asociado:', error);
    throw error;
  }
};

/**
 * Obtiene los estados válidos para un estado actual
 */
export const getProximosEstadosValidos = (estadoActual: EstadoPipeline): EstadoPipeline[] => {
  const TRANSICIONES_VALIDAS: Record<EstadoPipeline, EstadoPipeline[]> = {
    'Prospecto': ['Expediente en Construcción'],
    'Expediente en Construcción': ['Pendiente Jurídico', 'Pendiente Cierre de Crédito'],
    'Pendiente Jurídico': ['Expediente en Construcción', 'Pendiente Revisión Abogado'],
    'Pendiente Cierre de Crédito': ['Pendiente Firma y Litivo'],
    'Pendiente Firma y Litivo': ['Pendiente Revisión Abogado', 'Cartera Activa'],
    'Pendiente Revisión Abogado': ['Cartera Activa', 'Desembolsado/Finalizado'],
    'Cartera Activa': ['Desembolsado/Finalizado'],
    'Desembolsado/Finalizado': []
  };

  return TRANSICIONES_VALIDAS[estadoActual] || [];
};

/**
 * Verifica si una transición de estado es válida
 */
export const esTransicionValida = (estadoActual: EstadoPipeline, nuevoEstado: EstadoPipeline): boolean => {
  const proximosEstados = getProximosEstadosValidos(estadoActual);
  return proximosEstados.includes(nuevoEstado);
};
