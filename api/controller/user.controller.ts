import { Request, Response } from 'express'
import { withPrisma } from '@utils/queryDB.js'

export const getUsers = async (_req: Request, _res: Response) => {
  withPrisma(async (prisma) => {
    const users = await prisma.user.findMany()
    _res.status(200).json(users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active

    })))
  })
}
export const getUser = async (_req: Request, _res: Response) => {
  const { id } = _req.params
  withPrisma(async (prisma) => {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    })
    if (user == null) {
      _res.status(404).json({ message: 'User not found' })
    } else {
      _res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        active: user.active
      })
    }
  })
}

const checkNullFields = (fields: any) => {
  for (const field in fields) {
    if (fields[field] == null) {
      return true
    }
  }
  return false
}
export const createUser = async (_req: Request, _res: Response) => {
  const { name, email, password } = _req.body
  console.debug(_req.body)
  for (const field of [name, email, password]) {
    if (field == null) {
      _res.status(400).json({ message: 'Missing required field ' + field })
      return
    }
  }
  withPrisma(async (prisma) => {
    const user = await prisma.user.create({
      data: { name, email, password }
    })
    console.debug('User created:', user)
    _res.status(201).json(user)
  })
}
export const updateUser = async (_req: Request, _res: Response) => {
  // TODO: Implement updateUser
}
export const deleteUser = async (_req: Request, _res: Response) => {
  const { id } = _req.params
  withPrisma(async (prisma) => {
    const user = await prisma.user.delete({
      where: { id: parseInt(id) }
    })
    _res.status(200).json(user)
  })
}
export const refreshToken = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'refreshToken' })
}
export const forgotPassword = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'forgotPassword' })
}
export const signin = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'signin' })
}
export const logout = (_req: Request, _res: Response) => {
  _res.status(200).json({ message: 'logout' })
}
