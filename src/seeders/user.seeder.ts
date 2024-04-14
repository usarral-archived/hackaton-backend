import { PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'
const users = [
  {
    name: 'admin',
    email: 'admin@admin.es',
    password: createHash('sha256').update('admin').digest('hex'),
    active: 1,
    jwt_token: ''
  }
]

const prisma = new PrismaClient()
export async function seedUsers () {
  console.log('Seeding users...')
  for (const user of users) {
    await prisma.user.create({
      data: user
    })
  }
  console.log('users seeded')
  await prisma.$disconnect()
}
