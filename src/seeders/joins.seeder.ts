import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function permissionRoleAdmin () {
  const adminRole = await prisma.role.findUnique(
    {
      where: {
        name: 'admin'
      }
    }
  )
  if (adminRole != null) {
    const permissions = await prisma.permission.findMany()
    const adminPermissions = permissions.map(permission => ({
      roleId: adminRole.id,
      permissionId: permission.id
    }))
    await prisma.rolePermission.createMany({
      data: adminPermissions
    })
  }
}
async function roleUserAdmin () {
  const adminUser = await prisma.user.findUnique(
    {
      where: {
        email: 'admin@admin.es'
      }
    }
  )
  if (adminUser != null) {
    const adminRole = await prisma.role.findUnique(
      {
        where: {
          name: 'admin'
        }
      }
    )
    if (adminRole != null) {
      await prisma.userRole.create({
        data: {
          userId: adminUser.id,
          roleId: adminRole.id
        }
      })
    }
  }
}

export async function seedJoins () {
  console.log('Seeding joins...')

  await permissionRoleAdmin()
  await roleUserAdmin()

  console.log('Joins seeded')
  await prisma.$disconnect()
}

export default seedJoins
