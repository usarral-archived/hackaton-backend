import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { TYPE } from '@config/env.config.js'

import router from '@routes/router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(TYPE))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', router)
app.use('/', (_req, _res) => {
  _res.status(200).json({ message: 'Welcome to the API' })
})

export default app
