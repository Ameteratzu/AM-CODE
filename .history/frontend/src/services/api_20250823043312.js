// frontend/src/services/api.js
const API = import.meta.env.VITE_API_URL

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data?.error || data?.message || `Error ${res.status}`
    throw new Error(msg)
  }
  return data
}

export const api = {
  users: () => request('/usuarios'),
  today: (userId, offsetMin) => request(`/usuarios/${userId}/hoy?offset=${offsetMin}`),
  clockIn: (userId, extra = {}) => request('/punch/clock-in', { method: 'POST', body: { usuarioId: userId, ...extra } }),
  clockOut: (userId, extra = {}) => request('/punch/clock-out', { method: 'POST', body: { usuarioId: userId, ...extra } }),
  breakStart: (userId, kind, extra = {}) => request('/punch/break/start', { method: 'POST', body: { usuarioId: userId, kind, ...extra } }),
  breakEnd: (userId, kind, extra = {}) => request('/punch/break/end', { method: 'POST', body: { usuarioId: userId, kind, ...extra } }),
}

export const tzOffsetMinutes = () => {
  // JS devuelve minutos invertidos; convertimos a offset "signed" convencional
  return -new Date().getTimezoneOffset()
}
