import { PrismaClient } from '@prisma/client'

export const withPrisma = async (operation: (prisma: PrismaClient) => Promise<void>) => {
  const prisma = new PrismaClient()
  try {
    await operation(prisma)
  } finally {
    await prisma.$disconnect()
  }
}
