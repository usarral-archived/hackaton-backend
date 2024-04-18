import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { TYPE } from '@config/env.config.js'
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from '@config/swagger.config'
import router from '@routes/router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(TYPE))
app.use(express.urlencoded({ extended: true }))
const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/v1/', router)

// Error handling
// If the route is not found, return a 404 code and redirect to /api-docs/
app.use((_req, _res) => {
  _res.status(404).redirect('/api-docs/')
})

export default app
