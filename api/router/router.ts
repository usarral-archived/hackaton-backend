import { Router } from 'express'
import userRoutes from '@routes/user.routes.js'
import generalRoutes from '@routes/general.routes.js'

export const router = Router()

router.use('/users', userRoutes)

router.use('/', generalRoutes)

export default router
