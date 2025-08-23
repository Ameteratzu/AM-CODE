// backend/src/routes/attendance.routes.js
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = Router()

router.get('/usuarios', async (req, res) => {
  const list = await prisma.usuario.findMany({ orderBy: { id: 'asc' } })
  res.json(list)
})

// … el resto igual, SIN prefijo /api
// router.get('/usuarios/:id/hoy', …)
// router.post('/punch/clock-in', …)
// router.post('/punch/clock-out', …)
// router.post('/punch/break/start', …)
// router.post('/punch/break/end', …)

export default router
