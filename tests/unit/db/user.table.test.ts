import { describe, expect, it } from '@jest/globals'
import { randomBytes, createCipheriv } from 'node:crypto'
import {
  createUser, getUsers,
  getUserByEmail, updateUserName, deleteUser
} from '../../../db/tables/users.table'
const name = 'John Doe'
const email = 'john@example.com'
// ---
const algorithm = 'aes-256-cbc'
const key = randomBytes(32)
const iv = randomBytes(16)
const cipher = createCipheriv(algorithm, key, iv)
// ---
const passwordRaw = 'password123'
const password = cipher.update(passwordRaw, 'utf8', 'hex') + cipher.final('hex')
describe('User Table Tests', () => {
  // Test createUser function

  it('should create a new user in the database', async () => {
    // Test data

    // Call the createUser function
    const result = await createUser(name, email, password)

    // Assertions
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('name', name)
    expect(result).toHaveProperty('email', email)
    expect(result).toHaveProperty('active', 1)
  })
  it('should try to create a new user in the database, failing by email', async () => {
    const result = await createUser(name, email, password)
    expect(result).toHaveProperty('message', 'This email is already in use.')
  })

  // Test getUsers function
  it('should retrieve all users from the database', async () => {
    // Call the getUsers function
    const result = await getUsers()

    // Assertions
    // Check if has message property
    if (result[0].hasOwnProperty('message')) {
      expect(result[0]).toHaveProperty('message', 'No users found.')
      return
    }
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('name')
    expect(result[0]).toHaveProperty('email')
    expect(result[0]).toHaveProperty('active')
  })

  // Test getUserByEmail function
  it('should retrieve a user by their email address', async () => {
    // Test data

    // Call the getUserByEmail function
    const result = await getUserByEmail(email)

    // Assertions
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('email', email)
    expect(result).toHaveProperty('active')
  })

  // Test updateUserName function
  it('should update a user\'s name by their email address', async () => {
    // Test data
    const newName = 'Jane Doe'

    // Call the updateUserName function
    const result = await updateUserName(email, newName)

    // Assertions
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('name', newName)
    expect(result).toHaveProperty('email', email)
    expect(result).toHaveProperty('active')
  })

  // Test deleteUser function
  it('should delete a user by their email address', async () => {
    // Test data

    // Call the deleteUser function
    const result = await deleteUser(email)

    // Assertions
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('deleted', true)
  })
})
