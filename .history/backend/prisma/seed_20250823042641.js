import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Admin
  await prisma.usuario.upsert({
    where: { email: 'admin@amcode.com' },
    update: {},
    create: { email: 'admin@amcode.com', nombre: 'Admin', rol: 'ADMIN', tz: 'America/Lima' }
  })

  // Empleados
  await prisma.usuario.upsert({
    where: { email: 'ana@amcode.com' },
    update: {},
    create: { email: 'ana@amcode.com', nombre: 'Ana', rol: 'EMPLOYEE', tz: 'America/Lima' }
  })

  await prisma.usuario.upsert({
    where: { email: 'bruno@amcode.com' },
    update: {},
    create: { email: 'bruno@amcode.com', nombre: 'Bruno', rol: 'EMPLOYEE', tz: 'America/Lima' }
  })
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
