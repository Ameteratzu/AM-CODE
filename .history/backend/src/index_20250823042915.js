import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(morgan('dev'))
app.use(express.json())

// --- Helpers ---
async function lastPunch(usuarioId) {
  return prisma.marcacion.findFirst({
    where: { usuarioId },
    orderBy: { at: 'desc' }
  })
}

function canStartBreak(last, kind) {
  if (!last) return false
  return (
    last.tipo === 'CLOCK_IN' ||
    last.tipo === 'BREAK_END' ||
    last.tipo === 'LUNCH_END' ||
    last.tipo === 'TOILET_END'
  )
}

function canEndBreak(last, startKind) {
  if (!last) return false
  if (startKind === 'BREAK')  return last.tipo === 'BREAK_START'
  if (startKind === 'LUNCH')  return last.tipo === 'LUNCH_START'
  if (startKind === 'TOILET') return last.tipo === 'TOILET_START'
  return false
}

function canClockIn(last) {
  return !last || last.tipo === 'CLOCK_OUT' || last.tipo.endsWith('_END')
}

function canClockOut(last) {
  return last && (last.tipo === 'CLOCK_IN' || last.tipo.endsWith('_END'))
}

// Cálculo simple de totales del día con offset del cliente (minutos, p.ej. Lima = -300)
function startOfLocalDay(now = new Date(), offsetMinutes = -300) {
  const local = new Date(now.getTime() + offsetMinutes * 60_000)
  local.setHours(0, 0, 0, 0)
  return new Date(local.getTime() - offsetMinutes * 60_000) // vuelve a UTC
}

function computeTotals(punches) {
  // Recorre eventos y suma minutos de trabajo y de pausas
  let workMs = 0, breakMs = 0
  let lastType = null
  let lastTime = null

  for (const p of punches) {
    if (!lastType) { lastType = p.tipo; lastTime = p.at; continue }
    const dt = new Date(p.at) - new Date(lastTime)
    // Si veníamos trabajando (CLOCK_IN o *_END), sumamos a trabajo
    if (lastType === 'CLOCK_IN' || lastType.endsWith('_END')) workMs += dt
    // Si veníamos en pausa (BREAK/LUNCH/TOILET _START), sumamos a pausa
    if (
      lastType === 'BREAK_START' ||
      lastType === 'LUNCH_START' ||
      lastType === 'TOILET_START'
    ) breakMs += dt
    lastType = p.tipo
    lastTime = p.at
  }
  return {
    totalTrabajoMin: Math.round(workMs / 60000),
    totalPausaMin: Math.round(breakMs / 60000),
  }
}

// --- Rutas ---
app.get('/health', (req, res) => res.json({ ok: true }))

// Lista empleados
app.get('/api/usuarios', async (req, res) => {
  const list = await prisma.usuario.findMany({ orderBy: { id: 'asc' } })
  res.json(list)
})

// Entrar
app.post('/api/punch/clock-in', async (req, res) => {
  const { usuarioId, note, ip, userAgent, lat, lng } = req.body
  if (!usuarioId) return res.status(400).json({ error: 'usuarioId requerido' })
  const last = await lastPunch(usuarioId)
  if (!canClockIn(last)) return res.status(409).json({ error: 'Ya estás dentro o en pausa' })

  const p = await prisma.marcacion.create({
    data: { usuarioId, tipo: 'CLOCK_IN', note, ip, userAgent, lat, lng }
  })
  res.status(201).json(p)
})

// Salir
app.post('/api/punch/clock-out', async (req, res) => {
  const { usuarioId, note, ip, userAgent, lat, lng } = req.body
  if (!usuarioId) return res.status(400).json({ error: 'usuarioId requerido' })
  const last = await lastPunch(usuarioId)
  if (!canClockOut(last)) return res.status(409).json({ error: 'No puedes salir si no estás dentro o si sigues en pausa' })

  const p = await prisma.marcacion.create({
    data: { usuarioId, tipo: 'CLOCK_OUT', note, ip, userAgent, lat, lng }
  })
  res.status(201).json(p)
})

// Iniciar pausa (tipo: BREAK | LUNCH | TOILET)
app.post('/api/punch/break/start', async (req, res) => {
  const { usuarioId, kind, note, ip, userAgent, lat, lng } = req.body
  if (!usuarioId || !kind) return res.status(400).json({ error: 'usuarioId y kind requeridos' })
  const last = await lastPunch(usuarioId)
  if (!canStartBreak(last, kind)) return res.status(409).json({ error: 'No puedes iniciar pausa ahora' })

  const map = { BREAK: 'BREAK_START', LUNCH: 'LUNCH_START', TOILET: 'TOILET_START' }
  const p = await prisma.marcacion.create({
    data: { usuarioId, tipo: map[kind], note, ip, userAgent, lat, lng }
  })
  res.status(201).json(p)
})

// Terminar pausa (tipo: BREAK | LUNCH | TOILET)
app.post('/api/punch/break/end', async (req, res) => {
  const { usuarioId, kind, note, ip, userAgent, lat, lng } = req.body
  if (!usuarioId || !kind) return res.status(400).json({ error: 'usuarioId y kind requeridos' })
  const last = await lastPunch(usuarioId)
  if (!canEndBreak(last, kind)) return res.status(409).json({ error: 'No hay una pausa de ese tipo abierta' })

  const map = { BREAK: 'BREAK_END', LUNCH: 'LUNCH_END', TOILET: 'TOILET_END' }
  const p = await prisma.marcacion.create({
    data: { usuarioId, tipo: map[kind], note, ip, userAgent, lat, lng }
  })
  res.status(201).json(p)
})

// Resumen de hoy (pásame offset minutos: Lima = -300)
app.get('/api/usuarios/:id/hoy', async (req, res) => {
  const usuarioId = Number(req.params.id)
  const offset = Number(req.query.offset ?? -300) // Lima por defecto
  const start = startOfLocalDay(new Date(), offset)
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)

  const punches = await prisma.marcacion.findMany({
    where: { usuarioId, at: { gte: start, lt: end } },
    orderBy: { at: 'asc' }
  })
  const totales = computeTotals(punches)
  const last = punches[punches.length - 1] ?? null
  let estado = 'FUERA'
  if (last) {
    if (last.tipo === 'CLOCK_IN' || last.tipo.endsWith('_END')) estado = 'TRABAJANDO'
    if (last.tipo.endsWith('_START')) estado = 'EN_PAUSA'
  }

  res.json({ punches, ...totales, estado, diaInicioUTC: start, diaFinUTC: end })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API de asistencia en http://localhost:${PORT}`))
