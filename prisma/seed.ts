import { seedJoins } from '@seeders/joins.seeder.js'
import { seedPermissions } from '@seeders/permission.seeder.js'
import { seedRoles } from '@seeders/roles.seeder.js'
import { seedUsers } from '@seeders/user.seeder.js'

async function seedDatabase () {
  console.info('Seeding database...')
  await seedPermissions()
  await seedRoles()
  await seedUsers()
  await seedJoins()
  console.info('Database seeded')
}
seedDatabase().catch((error) => {
  console.error(error)
  process.exit(1)
})
