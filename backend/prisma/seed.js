import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function upsertUser(email, nombre, rol, pass) {
  const passwordHash = await bcrypt.hash(pass, 10)
  return prisma.usuario.upsert({
    where: { email },
    update: { nombre, rol, passwordHash, activo: true, tz: 'America/Lima' },
    create: { email, nombre, rol, passwordHash, activo: true, tz: 'America/Lima' }
  })
}

async function main() {
  await upsertUser('admin@amcode.com', 'Admin', 'ADMIN',   'admin123')
  await upsertUser('ana@amcode.com',   'Ana',   'EMPLOYEE','ana123')
  await upsertUser('bruno@amcode.com', 'Bruno', 'EMPLOYEE','bruno123')
}

main().finally(() => prisma.$disconnect())
