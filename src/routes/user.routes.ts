import { Router } from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser, refreshToken, forgotPassword, signin, logout } from '../controllers/user.controller.js'

const router = Router()

// GET /users
router.get('/', getUsers)
// GET /users/:id
router.get('/:id', getUser)
// POST /users
router.post('/', createUser)
// PUT /users/:id
router.put('/:id', updateUser)
// DELETE /users/:id
router.delete('/:id', deleteUser)
// POST /auth/refreshToken
router.get('/refreshToken', refreshToken)
// POST /auth/forgotPassword
router.get('/forgotPassword', forgotPassword)
// POST /auth/signin
router.post('/signin', signin)
// POST /auth/logout
router.post('/logout', logout)

export default router
