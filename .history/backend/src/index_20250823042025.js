import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { prisma } from './db/prisma.js'

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (req, res) => res.json({ ok: true }))

// === Clientes ===
app.get('/api/clientes', async (req, res) => {
  const data = await prisma.cliente.findMany({ include: { autos: true } })
  res.json(data)
})

// === Productos ===
app.get('/api/productos', async (req, res) => {
  const list = await prisma.producto.findMany()
  res.json(list)
})
app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body
  const p = await prisma.producto.create({ data: { nombre, precio: String(precio) } })
  res.status(201).json(p)
})

// === Órdenes ===
app.get('/api/ordenes', async (req, res) => {
  const list = await prisma.orden.findMany({
    include: {
      cliente: true,
      automovil: true,
      usuario: true,
      items: { include: { producto: true } }
    }
  })
  res.json(list)
})

app.post('/api/ordenes', async (req, res) => {
  const { clienteId, automovilId, usuarioId, numero, items } = req.body
  const orden = await prisma.orden.create({
    data: {
      clienteId, automovilId, usuarioId, numero,
      items: { create: items.map(i => ({ productoId: i.productoId, cantidad: i.cantidad })) }
    },
    include: { items: { include: { producto: true } } }
  })
  res.status(201).json(orden)
})

// Cambiar estado de una orden
app.patch('/api/ordenes/:id/estado', async (req, res) => {
  const { id } = req.params
  const { estado } = req.body // 'CREADA' | 'PESO' | 'DESPACHO' | 'ENTREGADO'
  const orden = await prisma.orden.update({
    where: { id: Number(id) },
    data: { estado },
  })
  res.json(orden)
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`))
