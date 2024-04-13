import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { TYPE } from '@config/env.config.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(TYPE))

app.use('/users', userRoutes)

export default app
