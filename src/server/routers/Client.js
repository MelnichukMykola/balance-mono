import { Router } from 'express'
import AuthController from '../controllers/Auth.js'
import AuthValidator from '../validators/Auth.js'

const router = Router()

router.post('/app-data', AuthValidator.handleAppData, AuthController.handleAppData)

export default router
