import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { requireAuth, requireRole } from '../middleware/auth.js'

const prisma = new PrismaClient()
const router = Router()

const lastPunch = (usuarioId) =>
  prisma.marcacion.findFirst({ where: { usuarioId }, orderBy: { at: 'desc' } })

const canStartBreak = (last) =>
  last && (last.tipo === 'CLOCK_IN' || last.tipo.endsWith('_END'))

const canEndKind = (last, kind) => {
  if (!last) return false
  if (kind === 'BREAK')  return last.tipo === 'BREAK_START'
  if (kind === 'LUNCH')  return last.tipo === 'LUNCH_START'
  if (kind === 'TOILET') return last.tipo === 'TOILET_START'
  return false
}

const canClockIn = (last) => !last || last.tipo === 'CLOCK_OUT' || last.tipo.endsWith('_END')
const canClockOut = (last) => last && (last.tipo === 'CLOCK_IN' || last.tipo.endsWith('_END'))

function startOfLocalDay(now = new Date(), offsetMinutes = -300) {
  const local = new Date(now.getTime() + offsetMinutes * 60000)
  local.setHours(0,0,0,0)
  return new Date(local.getTime() - offsetMinutes * 60000)
}
function computeTotals(punches) {
  let workMs=0, breakMs=0, lastType=null, lastTime=null
  for (const p of punches) {
    if (!lastType) { lastType=p.tipo; lastTime=p.at; continue }
    const dt = new Date(p.at) - new Date(lastTime)
    if (lastType === 'CLOCK_IN' || lastType.endsWith('_END')) workMs += dt
    if (['BREAK_START','LUNCH_START','TOILET_START'].includes(lastType)) breakMs += dt
    lastType = p.tipo; lastTime = p.at
  }
  return { totalTrabajoMin: Math.round(workMs/60000), totalPausaMin: Math.round(breakMs/60000) }
}

// === Empleado actual ===
router.get('/me/hoy', requireAuth, async (req, res) => {
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

// === Acciones del empleado actual ===
router.post('/punch/clock-in',  requireAuth, async (req, res) => {
  const last = await lastPunch(req.user.id)
  if (!canClockIn(last)) return res.status(409).json({ error: 'Ya estás dentro o en pausa' })
  const p = await prisma.marcacion.create({ data: { usuarioId: req.user.id, tipo: 'CLOCK_IN', ...req.body } })
  res.status(201).json(p)
})

router.post('/punch/clock-out', requireAuth, async (req, res) => {
  const last = await lastPunch(req.user.id)
  if (!canClockOut(last)) return res.status(409).json({ error: 'No puedes salir si no estás dentro o sigues en pausa' })
  const p = await prisma.marcacion.create({ data: { usuarioId: req.user.id, tipo: 'CLOCK_OUT', ...req.body } })
  res.status(201).json(p)
})

router.post('/punch/break/start', requireAuth, async (req, res) => {
  const { kind } = req.body
  const last = await lastPunch(req.user.id)
  if (!canStartBreak(last)) return res.status(409).json({ error: 'No puedes iniciar pausa ahora' })
  const map = { BREAK:'BREAK_START', LUNCH:'LUNCH_START', TOILET:'TOILET_START' }
  const p = await prisma.marcacion.create({ data: { usuarioId: req.user.id, tipo: map[kind], ...req.body } })
  res.status(201).json(p)
})

router.post('/punch/break/end', requireAuth, async (req, res) => {
  const { kind } = req.body
  const last = await lastPunch(req.user.id)
  if (!canEndKind(last, kind)) return res.status(409).json({ error: 'No hay una pausa de ese tipo abierta' })
  const map = { BREAK:'BREAK_END', LUNCH:'LUNCH_END', TOILET:'TOILET_END' }
  const p = await prisma.marcacion.create({ data: { usuarioId: req.user.id, tipo: map[kind], ...req.body } })
  res.status(201).json(p)
})

// === Endpoints de gestión (solo ADMIN/MANAGER) ===
router.get('/usuarios', requireAuth, requireRole('ADMIN','MANAGER'), async (_req, res) => {
  const list = await prisma.usuario.findMany({ orderBy: { id: 'asc' } })
  res.json(list)
})

export default router
