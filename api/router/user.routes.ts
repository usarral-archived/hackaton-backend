/**
 * Express router for user routes.
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users.
 */
import { Router } from 'express'
import { createUserRoute, deleteUserRoute, getUserRoute, getUsersRoute, updateUserRoute, refreshTokenRoute, forgotPasswordRoute, signinRoute, logoutRoute } from '../controller/user.controller.js'

const router = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns an array of all users
 */
router.get('/', getUsersRoute)

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the user with the specified email
 *       404:
 *         description: User not found
 */
router.get('/:email', getUserRoute)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/', createUserRoute)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 */
router.put('/:id', updateUserRoute)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', deleteUserRoute)

/**
 * @swagger
 * /users/refreshToken:
 *   get:
 *     summary: Refresh user token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/refreshToken', refreshTokenRoute)

/**
 * @swagger
 * /users/forgotPassword:
 *   get:
 *     summary: Forgot user password
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       404:
 *         description: User not found
 */
router.get('/forgotPassword', forgotPasswordRoute)

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: User sign in
 *     tags: [Users]
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCredentials'
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/signin', signinRoute)

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: User logout
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', logoutRoute)

export default router
