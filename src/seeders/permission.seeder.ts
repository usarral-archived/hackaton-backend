import { PrismaClient } from '@prisma/client'
const permissions = [
  {
    name: 'create:users',
    description: 'Create users'
  },
  {
    name: 'read:users',
    description: 'Read users'
  },
  {
    name: 'update:users',
    description: 'Update users'
  },
  {
    name: 'delete:users',
    description: 'Delete users'
  }]

export async function seedPermissions () {
  const prisma = new PrismaClient()
  for (const permission of permissions) {
    await prisma.permission.create({
      data: permission
    })
  }
  await prisma.$disconnect()
}
