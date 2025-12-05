import { Request, Response } from 'express'
import prisma from '../prisma'
import { 
  UpdateEstadoRequest, 
  UpdateEstadoResponse, 
  ESTADOS_VALIDOS, 
  EstadoPipeline,
  TRANSICIONES_VALIDAS
} from '../types/asociado'

export class AsociadosController {
  
  // Obtener todos los asociados
  async getAllAsociados(req: Request, res: Response) {
    try {
      const asociados = await prisma.asociado.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      res.json({
        success: true,
        data: asociados
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener asociados',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Obtener un asociado por ID
  async getAsociadoById(req: Request, res: Response) {
    try {
      const { id } = req.params
      
      const asociado = await prisma.asociado.findUnique({
        where: { id }
      })
      
      if (!asociado) {
        return res.status(404).json({
          success: false,
          message: 'Asociado no encontrado'
        })
      }
      
      res.json({
        success: true,
        data: asociado
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener asociado',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Actualizar estado del pipeline
  async updateEstadoPipeline(req: Request, res: Response) {
    try {
      const { asociadoId, nuevoEstado }: UpdateEstadoRequest = req.body
      
      // Validar que el nuevo estado sea válido
      if (!ESTADOS_VALIDOS.includes(nuevoEstado as EstadoPipeline)) {
        return res.status(400).json({
          success: false,
          message: `Estado inválido. Estados válidos: ${ESTADOS_VALIDOS.join(', ')}` 
        })
      }
      
      // Buscar el asociado
      const asociado = await prisma.asociado.findUnique({
        where: { id: asociadoId }
      })
      
      if (!asociado) {
        return res.status(404).json({
          success: false,
          message: 'Asociado no encontrado'
        })
      }
      
      // Validar transición lógica
      const estadoActual = asociado.estado_pipeline as EstadoPipeline
      const estadoNuevo = nuevoEstado as EstadoPipeline
      
      if (!TRANSICIONES_VALIDAS[estadoActual]?.includes(estadoNuevo)) {
        return res.status(400).json({
          success: false,
          message: `Transición no permitida. De "${estadoActual}" solo se puede pasar a: ${TRANSICIONES_VALIDAS[estadoActual]?.join(', ') || 'ninguno'}` 
        })
      }
      
      // Actualizar el asociado
      const asociadoActualizado = await prisma.asociado.update({
        where: { id: asociadoId },
        data: {
          estado_pipeline: nuevoEstado,
          ultima_actualizacion: new Date()
        }
      })
      
      const response: UpdateEstadoResponse = {
        success: true,
        message: 'Estado actualizado correctamente',
        data: asociadoActualizado
      }
      
      res.json(response)
      
    } catch (error) {
      console.error('Error en updateEstadoPipeline:', error)
      
      res.status(500).json({
        success: false,
        message: 'Error al actualizar estado del pipeline',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  // Crear nuevo asociado
  async createAsociado(req: Request, res: Response) {
    try {
      const { codigo, nombre, identificacion, estado_pipeline } = req.body
      
      // Validar estado inicial
      if (estado_pipeline && !ESTADOS_VALIDOS.includes(estado_pipeline as EstadoPipeline)) {
        return res.status(400).json({
          success: false,
          message: `Estado inválido. Estados válidos: ${ESTADOS_VALIDOS.join(', ')}` 
        })
      }
      
      const nuevoAsociado = await prisma.asociado.create({
        data: {
          codigo,
          nombre,
          identificacion,
          estado_pipeline: estado_pipeline || 'Prospecto'
        }
      })
      
      res.status(201).json({
        success: true,
        message: 'Asociado creado correctamente',
        data: nuevoAsociado
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear asociado',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
}
