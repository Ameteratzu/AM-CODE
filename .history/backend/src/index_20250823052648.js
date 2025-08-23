// backend/src/index.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
})

const prisma = new PrismaClient()
const app = express()

// --- Middlewares base ---
app.use(cors({
  // en dev, CRA corre en 3000
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())

// --- Auth helpers ---
function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const [, token] = header.split(' ')
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload // { id, email, rol, nombre }
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No auth' })
    if (!roles.includes(req.user.rol)) return res.status(403).json({ error: 'Sin permiso' })
    next()
  }
}

// --- Asistencia helpers ---
async function lastPunch(usuarioId) {
  return prisma.marcacion.findFirst({
    where: { usuarioId },
    orderBy: { at: 'desc' }
  })
}
const canClockIn  = (last) => !last || last.tipo === 'CLOCK_OUT' || last.tipo.endsWith('_END')
const canClockOut = (last) => last && (last.tipo === 'CLOCK_IN' || last.tipo.endsWith('_END'))
const canStartBreak = (last) => last && (last.tipo === 'CLOCK_IN' || last.tipo.endsWith('_END'))
function canEndKind(last, kind) {
  if (!last) return false
  if (kind === 'BREAK')  return last.tipo === 'BREAK_START'
  if (kind === 'LUNCH')  return last.tipo === 'LUNCH_START'
  if (kind === 'TOILET') return last.tipo === 'TOILET_START'
  return false
}
function startOfLocalDay(now = new Date(), offsetMinutes = -300) {
  const local = new Date(now.getTime() + offsetMinutes * 60000)
  local.setHours(0, 0, 0, 0)
  return new Date(local.getTime() - offsetMinutes * 60000) // back to UTC
}
function computeTotals(punches) {
  let workMs = 0, breakMs = 0, lastType = null, lastTime = null
  for (const p of punches) {
    if (!lastType) { lastType = p.tipo; lastTime = p.at; continue }
    const dt = new Date(p.at) - new Date(lastTime)
    if (lastType === 'CLOCK_IN' || lastType.endsWith('_END')) workMs += dt
    if (['BREAK_START','LUNCH_START','TOILET_START'].includes(lastType)) breakMs += dt
    lastType = p.tipo; lastTime = p.at
  }
  return { totalTrabajoMin: Math.round(workMs/60000), totalPausaMin: Math.round(breakMs/60000) }
}

// Solo incluir campos permitidos en Marcacion (evita pasar `kind`)
function meta(body = {}) {
  const { note, ip, userAgent, lat, lng, at } = body
  const out = {}
  if (note !== undefined) out.note = note
  if (ip !== undefined) out.ip = ip
  if (userAgent !== undefined) out.userAgent = userAgent
  if (lat !== undefined) out.lat = lat
  if (lng !== undefined) out.lng = lng
  if (at !== undefined) out.at = at
  return out
}

// --- Health ---
app.get('/health', (_, res) => res.json({ ok: true }))

// --- Auth ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email y password requeridos' })

  const user = await prisma.usuario.findUnique({ where: { email } })
  if (!user || !user.passwordHash) return res.status(401).json({ error: 'Credenciales inválidas' })
  if (!user.activo) return res.status(403).json({ error: 'Usuario inactivo' })

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' })

  const token = jwt.sign(
    { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '10h' }
  )
  res.json({ token, user: { id: user.id, email: user.email, nombre: user.nombre, rol: user.rol } })
})

app.get('/api/auth/me', requireAuth, async (req, res) => {
  const u = await prisma.usuario.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, nombre: true, rol: true, tz: true }
  })
  res.json(u)
})

// --- Asistencia (empleado logueado) ---
app.get('/api/me/hoy', requireAuth, async (req, res) => {
  const offset = Number(req.query.offset ?? -300)
  const start = startOfLocalDay(new Date(), offset)
  const end   = new Date(start.getTime() + 24*60*60*1000)

  const punches = await prisma.marcacion.findMany({
    where: { usuarioId: req.user.id, at: { gte: start, lt: end } },
    orderBy: { at: 'asc' }
  })
  const tot = computeTotals(punches)
  const last = punches[punches.length-1] ?? null
  let estado = 'FUERA'
  if (last) {
    if (last.tipo === 'CLOCK_IN' || last.tipo.endsWith('_END')) estado = 'TRABAJANDO'
    if (last.tipo.endsWith('_START')) estado = 'EN_PAUSA'
  }
  res.json({ punches, ...tot, estado, diaInicioUTC: start, diaFinUTC: end })
})

app.post('/api/punch/clock-in', requireAuth, async (req, res) => {
  const last = await lastPunch(req.user.id)
  if (!canClockIn(last)) return res.status(409).json({ error: 'Ya estás dentro o en pausa' })
  const p = await prisma.marcacion.create({
    data: { usuarioId: req.user.id, tipo: 'CLOCK_IN', ...meta(req.body) }
  })
  res.status(201).json(p)
})

app.post('/api/punch/clock-out', requireAuth, async (req, res) => {
  const last = await lastPunch(req.user.id)
  if (!canClockOut(last)) return res.status(409).json({ error: 'No puedes salir si no estás dentro o sigues en pausa' })
  const p = await prisma.marcacion.create({
    data: { usuarioId: req.user.id, tipo: 'CLOCK_OUT', ...meta(req.body) }
  })
  res.status(201).json(p)
})

app.post('/api/punch/break/start', requireAuth, async (req, res) => {
  const { kind } = req.body // 'BREAK' | 'LUNCH' | 'TOILET'
  if (!kind) return res.status(400).json({ error: 'kind requerido' })
  const last = await lastPunch(req.user.id)
  if (!canStartBreak(last)) return res.status(409).json({ error: 'No puedes iniciar pausa ahora' })
  const map = { BREAK: 'BREAK_START', LUNCH: 'LUNCH_START', TOILET: 'TOILET_START' }
  if (!map[kind]) return res.status(400).json({ error: 'kind inválido' })

  const p = await prisma.marcacion.create({
    data: { usuarioId: req.user.id, tipo: map[kind], ...meta(req.body) } // <- sin `kind`
  })
  res.status(201).json(p)
})

app.post('/api/punch/break/end', requireAuth, async (req, res) => {
  const { kind } = req.body // 'BREAK' | 'LUNCH' | 'TOILET'
  if (!kind) return res.status(400).json({ error: 'kind requerido' })
  const last = await lastPunch(req.user.id)
  if (!canEndKind(last, kind)) return res.status(409).json({ error: 'No hay una pausa de ese tipo abierta' })
  const map = { BREAK: 'BREAK_END', LUNCH: 'LUNCH_END', TOILET: 'TOILET_END' }
  if (!map[kind]) return res.status(400).json({ error: 'kind inválido' })

  const p = await prisma.marcacion.create({
    data: { usuarioId: req.user.id, tipo: map[kind], ...meta(req.body) } // <- sin `kind`
  })
  res.status(201).json(p)
})

// --- Gestión (solo ADMIN/MANAGER) ---
app.get('/api/usuarios', requireAuth, requireRole('ADMIN','MANAGER'), async (_req, res) => {
  const list = await prisma.usuario.findMany({ orderBy: { id: 'asc' } })
  res.json(list)
})

// --- Start server ---
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API de asistencia en http://localhost:${PORT}`))
