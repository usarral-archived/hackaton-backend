import { Router } from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js'

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

export default router
