import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { TYPE } from '@config/env.config.js'
import userRoutes from '../routes/user.routes.js'
// import generalRoutes from '../routes/general.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(TYPE))

app.use('/users', userRoutes)
app.use('/', (_req, res) => res.json({ message: 'Welcome to the API' }))

export default app
