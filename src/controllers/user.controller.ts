import { Request, Response } from 'express'
import { withPrisma } from 'helpers/queryDB.js'

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
export const createUser = async (_req: Request, _res: Response) => {
  const { name, email, password } = _req.body
  withPrisma(async (prisma) => {
    const user = await prisma.user.create({
      data: { name, email, password }
    })
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
