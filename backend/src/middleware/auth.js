import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
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

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No auth' })
    if (!roles.includes(req.user.rol)) return res.status(403).json({ error: 'Sin permiso' })
    next()
  }
}
