import { PrismaClient } from '@prisma/client'

/**
 * Creates a new user in the database.
 * @param name - The name of the user.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns An object containing the user's id, name, email, and active status.
 */
export const createUser = async (name: string, email: string, password: string) => {
  const prisma = new PrismaClient()
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
    prisma.$disconnect()
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active
    }
  } catch (error: any) {
    // Handle constraint exception here
    if (error.code === 'P2002') {
      return { message: 'This email is already in use.' }
    }
    // Add a default return value in case of other errors
    return { message: 'An error occurred while creating the user.' }
  }
}
/**
 * Retrieves all users from the database.
 * @returns An array of objects containing the users' id, name, email, and active status.
 */
export const getUsers = async () => {
  const prisma = new PrismaClient()
  const usersDB = await prisma.user.findMany()

  prisma.$disconnect()
  if (usersDB.length === 0) {
    return [{ message: 'No users found.' }]
  }
  // return usersDB as an array of objects containing the users' id, name, email, and active status
  return usersDB.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active
    }
  })
}
/**
 * Retrieves a user by their email address.
 * @param email - The email address of the user.
 * @returns An object containing the user's id, name, email, and active status.
 */
export const getUserByEmail = async (email: string) => {
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  prisma.$disconnect()
  if (user == null) {
    return { message: 'User not found.' }
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    active: user.active
  }
}
/**
 * Updates a user's name by their email address.
 * @param email - The email address of the user.
 * @param name - The new name of the user.
 * @returns An object containing the user's id, name, email, and active status.
 */
export const updateUserName = async (email: string, name: string) => {
  const prisma = new PrismaClient()
  const user = await prisma.user.update({
    where: {
      email
    },
    data: {
      name
    }
  })
  prisma.$disconnect()
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    active: user.active
  }
}
/**
 * Deletes a user by their id or email address.
 * @param identifier - The id or email address of the user.
 * @returns An object containing the user's id, name, email, and active status.
 */
export const deleteUser = async (identifier: string) => {
  try {
    const prisma = new PrismaClient()
    let user
    if (identifier.includes('@')) {
      // Delete user by email
      user = await prisma.user.delete({
        where: {
          email: identifier
        }
      })
    } else {
      // Delete user by id
      user = await prisma.user.delete({
        where: {
          id: parseInt(identifier)
        }
      })
    }
    prisma.$disconnect()
    return {
      id: user.id,
      deleted: true
    }
  } catch (error: any) {
    return { message: 'An error occurred while deleting the user.' }
  }
}
