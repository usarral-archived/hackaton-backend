import { PrismaClient } from '@prisma/client'

export const withPrisma = async (operation: (prisma: PrismaClient) => Promise<void>) => {
  const prisma = new PrismaClient()
  try {
    await operation(prisma).catch((error) => {
      console.error(error)
      prisma.$disconnect()
    })
  } finally {
    await prisma.$disconnect()
  }
}
