import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { requireAuth } from '../middleware/auth.js'

const prisma = new PrismaClient()
const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email y password requeridos' })
  const user = await prisma.usuario.findUnique({ where: { email } })
  if (!user || !user.passwordHash) return res.status(401).json({ error: 'Credenciales inválidas' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' })
  if (!user.activo) return res.status(403).json({ error: 'Usuario inactivo' })

  const token = jwt.sign(
    { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '10h' }
  )
  res.json({ token, user: { id: user.id, email: user.email, nombre: user.nombre, rol: user.rol } })
})

router.get('/me', requireAuth, async (req, res) => {
  const u = await prisma.usuario.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, nombre: true, rol: true, tz: true }
  })
  res.json(u)
})

export default router
