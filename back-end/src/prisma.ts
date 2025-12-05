import { PrismaClient } from '@prisma/client/edge'

const prisma = new PrismaClient({
  datasourceUrl: 'file:./dev.db'
})

export default prisma