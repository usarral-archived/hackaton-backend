import { Request, Response } from 'express'

export const indexRoute = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the API' })
}
