import { Router } from 'express'
import { AsociadosController } from '../controllers/asociadosController'

const router = Router()
const asociadosController = new AsociadosController()

// Obtener todos los asociados
router.get('/', asociadosController.getAllAsociados.bind(asociadosController))

// Obtener un asociado por ID
router.get('/:id', asociadosController.getAsociadoById.bind(asociadosController))

// Actualizar estado del pipeline
router.post('/update-estado', asociadosController.updateEstadoPipeline.bind(asociadosController))

// Crear nuevo asociado
router.post('/', asociadosController.createAsociado.bind(asociadosController))

// Actualizar un asociado por ID
router.patch('/:id', asociadosController.updateAsociadoID.bind(asociadosController))

export default router
