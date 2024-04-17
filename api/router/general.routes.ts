import { Router } from 'express'
import { indexRoute } from '@controllers/general.controller.js'
export const router = Router()

router.use('/', indexRoute)

export default router
