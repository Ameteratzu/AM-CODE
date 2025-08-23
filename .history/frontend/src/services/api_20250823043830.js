// frontend/src/services/api.js
const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });
  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    data = null;
  }
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Error ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  users: () => request('/usuarios'),
  today: (userId, offsetMin) => request(`/usuarios/${userId}/hoy?offset=${offsetMin}`),
  clockIn: (userId, extra = {}) => request('/punch/clock-in', { method: 'POST', body: { usuarioId: userId, ...extra } }),
  clockOut: (userId, extra = {}) => request('/punch/clock-out', { method: 'POST', body: { usuarioId: userId, ...extra } }),
  breakStart: (userId, kind, extra = {}) => request('/punch/break/start', { method: 'POST', body: { usuarioId: userId, kind, ...extra } }),
  breakEnd: (userId, kind, extra = {}) => request('/punch/break/end', { method: 'POST', body: { usuarioId: userId, kind, ...extra } }),
};

export const tzOffsetMinutes = () => -new Date().getTimezoneOffset();
