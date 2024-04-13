import app from './config/express.config.js'
import { BACKEND_PORT } from './config/env.config.js'

app.listen(BACKEND_PORT, () => {
  console.log(`🚀 Server is running on port ${BACKEND_PORT}`)
})
