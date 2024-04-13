import { Request, Response } from 'express'
import { withPrisma } from 'helpers/queryDB.js'

export const getUsers = async (_req: Request, _res: Response) => {
  withPrisma(async (prisma) => {
    const users = await prisma.users.findMany()
    _res.status(200).json(users)
  })
}
export const getUser = async (_req: Request, _res: Response) => {
  const { id } = _req.params
  withPrisma(async (prisma) => {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) }
    })
    if (user == null) {
      _res.status(404).json({ message: 'User not found' })
    } else {
      _res.status(200).json(user)
    }
  })
}
export const createUser = async (_req: Request, _res: Response) => {
  // TODO: Implement createUser
}
export const updateUser = async (_req: Request, _res: Response) => {
  // TODO: Implement updateUser
}
export const deleteUser = async (_req: Request, _res: Response) => {
  // TODO: Implement deleteUser
}
