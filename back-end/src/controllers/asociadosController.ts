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
  // Actualizar un asociado por ID (actualización parcial)
  async updateAsociadoID(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Se requiere un ID numérico válido'
        });
      }

      const updateData = req.body;
      
      // Verificar si el cuerpo de la solicitud está vacío
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No se proporcionaron datos para actualizar'
        });
      }

      // Verificar si el asociado existe
      const existingAsociado = await prisma.asociado.findUnique({
        where: { id }
      });

      if (!existingAsociado) {
        return res.status(404).json({
          success: false,
          message: 'Asociado no encontrado'
        });
      }

      // Actualizar el asociado
      const updatedAsociado = await prisma.asociado.update({
        where: { id },
        data: updateData
      });

      res.json({
        success: true,
        message: 'Asociado actualizado exitosamente',
        data: updatedAsociado
      });

    } catch (error) {
      console.error('Error al actualizar asociado:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el asociado',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
  
  
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
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Se requiere un ID numérico válido'
        });
      }
      
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
      const { asociadoId, nuevoEstado }: UpdateEstadoRequest = req.body;
      
      // Validar que se proporcionó el ID o código del asociado
      if (!asociadoId) {
        return res.status(400).json({
          success: false,
          message: 'Se requiere un ID o código de asociado válido'
        });
      }
      
      // Validar que el nuevo estado sea válido
      if (!ESTADOS_VALIDOS.includes(nuevoEstado as EstadoPipeline)) {
        return res.status(400).json({
          success: false,
          message: `Estado inválido. Estados válidos: ${ESTADOS_VALIDOS.join(', ')}` 
        })
      }
      
      // Buscar el asociado por código o ID
      let asociado = null;
      
      // Primero intentamos buscar por código (si es un string)
      if (typeof asociadoId === 'string') {
        asociado = await prisma.asociado.findFirst({
          where: { 
            OR: [
              { codigo: asociadoId },
              { identificacion: asociadoId }
            ]
          }
        });
      }
      
      // Si no se encontró por código, intentamos por ID numérico
      if (!asociado && !isNaN(Number(asociadoId))) {
        asociado = await prisma.asociado.findUnique({
          where: { id: Number(asociadoId) }
        });
      }
      
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
      const ahora = new Date()
      const asociadoActualizado = await prisma.asociado.update({
        where: { id: asociado.id },  // Usamos el ID numérico del asociado encontrado
        data: {
          estado_pipeline: nuevoEstado,
          ultima_actualizacion: ahora,
          updatedAt: ahora
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
      const ahora = new Date();
      
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
          estado_pipeline: estado_pipeline || 'Prospecto',
          ultima_actualizacion: ahora,
          createdAt: ahora,
          updatedAt: ahora
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

  // Actualizar información de un asociado
  async updateAsociado(req: Request, res: Response) {
    try {
      const asociadoId = req.body.asociadoId;
      
      if (!asociadoId) {
        return res.status(400).json({
          success: false,
          message: 'El ID del asociado es requerido'
        });
      }
      
      const { codigo, nombre, identificacion } = req.body;
      
      // Verificar si el asociado existe
      const asociadoExistente = await prisma.asociado.findUnique({
        where: { id: asociadoId },
      });
      
      if (!asociadoExistente) {
        return res.status(404).json({
          success: false,
          message: 'Asociado no encontrado'
        });
      }
      
      // Actualizar el asociado
      const asociadoActualizado = await prisma.asociado.update({
        where: { id: asociadoId },
        data: {
          codigo,
          nombre,
          identificacion,
          ultima_actualizacion: new Date()
        }
      });
      
      res.json({
        success: true,
        message: 'Asociado actualizado correctamente',
        data: asociadoActualizado
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar asociado',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
