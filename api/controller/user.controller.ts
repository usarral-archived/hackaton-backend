import { Request, Response } from 'express'
import { getUsers, getUserByEmail, deleteUser, createUser } from '@db/tables/users.table.js'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const getUsersRoute = async (_req: Request, _res: Response) => {
  const users = await getUsers()
  _res.status(200).json(users)
}
export const getUserRoute = async (_req: Request, _res: Response) => {
  const { email } = _req.params
  checkNull(email) ? _res.status(400).json({ message: 'Missing required field email' }) : null
  const user = await getUserByEmail(email)
  if (user.hasOwnProperty('message')) {
    _res.status(404).json(user)
    return
  }
  _res.status(200).json(user)
}

export const checkNull = (field: string) => {
  if (field == null) {
    return true
  }
  return false
}

export const createUserRoute = async (_req: Request, _res: Response) => {
  const name = _req.body.name
  const email = _req.body.email
  const password = _req.body.password
  checkNull(name) || checkNull(email) || checkNull(password) ? _res.status(400).json({ message: 'Missing required field name, email, or password' }) : null

  if (!emailRegex.test(email)) {
    _res.status(400).json({ message: 'Invalid email address' })
    return
  }

  const query = createUser(name, email, password)

  if (query.hasOwnProperty('message')) {
    _res.status(400).json(query)
    return
  }

  _res.status(201).json(query)
}
export const updateUserRoute = async (_req: Request, _res: Response) => {
  // TODO: Implement updateUser

}
export const deleteUserRoute = async (_req: Request, _res: Response) => {
  const { id } = _req.params
  checkNull(id) ? _res.status(400).json({ message: 'Missing required field id' }) : null
  const query = deleteUser(id)

  if (query.hasOwnProperty('message')) {
    _res.status(404).json(query)
    return
  }
  _res.status(200).json(query)
}
export const refreshTokenRoute = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'refreshToken' })
}
export const forgotPasswordRoute = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'forgotPassword' })
}
export const signinRoute = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'signin' })
}
export const logoutRoute = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'logout' })
}
