import { PrismaClient } from '@prisma/client'
const roles = [
  {
    name: 'admin',
    description: 'Administrator'
  }
]

const prisma = new PrismaClient()
export async function seedRoles () {
  console.log('Seeding roles...')
  for (const rol of roles) {
    await prisma.role.create({
      data: rol
    })
  }
  console.log('Roles seeded')
  await prisma.$disconnect()
}
