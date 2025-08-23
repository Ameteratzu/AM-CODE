import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Usuario
  const usuario = await prisma.usuario.upsert({
    where: { email: 'admin@amcode.com' },
    update: {},
    create: { email: 'admin@amcode.com', nombre: 'Admin', rol: 'admin' }
  })

  // Cliente
  const cliente = await prisma.cliente.create({
    data: {
      nombres: 'Juan',
      apellidos: 'Pérez',
      telefono: '999999999',
      email: 'juan.perez@example.com'
    }
  })

  // Automóvil
  const automovil = await prisma.automovil.create({
    data: {
      placa: 'ABC-123',
      marca: 'Toyota',
      modelo: 'Yaris',
      anio: 2018,
      clienteId: cliente.id
    }
  })

  // Productos
  const cambioAceite = await prisma.producto.create({
    data: { nombre: 'Cambio de aceite', precio: '120.00' } // Decimal como string
  })
  const alineacion = await prisma.producto.create({
    data: { nombre: 'Alineación y balanceo', precio: '80.00' }
  })

  // Orden con items
  await prisma.orden.create({
    data: {
      numero: 'ORD-0001',
      estado: 'CREADA',
      clienteId: cliente.id,
      automovilId: automovil.id,
      usuarioId: usuario.id,
      items: {
        create: [
          { productoId: cambioAceite.id, cantidad: 1 },
          { productoId: alineacion.id, cantidad: 1 }
        ]
      }
    }
  })
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
