// frontend/src/services/api.js
import { getToken } from './auth';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

async function request(path, { method='GET', body, headers={} } = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 
      'Content-Type':'application/json', 
      ...(token ? { Authorization:`Bearer ${token}` } : {}), 
      ...headers 
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null; try { data = JSON.parse(text); } catch (_) {}
  if (!res.ok) throw new Error(data?.error || text || `Error ${res.status}`);
  return data;
}

export const api = {
  // asistencia (empleado autenticado)
  meToday:  (offsetMin)   => request(`/me/hoy?offset=${offsetMin}`),
  clockIn:  (extra={})    => request('/punch/clock-in',  { method:'POST', body: { ...extra } }),
  clockOut: (extra={})    => request('/punch/clock-out', { method:'POST', body: { ...extra } }),
  breakStart: (kind, extra={}) => request('/punch/break/start', { method:'POST', body:{ kind, ...extra } }),
  breakEnd:   (kind, extra={}) => request('/punch/break/end',   { method:'POST', body:{ kind, ...extra } }),

  // evidencias
  myEvidences: () => request('/evidencias/mias'),
  evidencesByUser: (usuarioId) => request(`/evidencias?usuarioId=${usuarioId}`),
};

// Subida de archivos a Cloudinary vía backend
export async function uploadToCloudinary(file, { folder='amcode/attendance', kind='SCREENSHOT', marcacionId, note } = {}) {
  const token = getToken();
  const fd = new FormData();
  fd.append('file', file);
  fd.append('folder', folder);
  fd.append('kind', kind); // SCREENSHOT | RECORDING
  if (note) fd.append('note', note);
  if (marcacionId) fd.append('marcacionId', String(marcacionId));

  const res = await fetch(`${API}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: fd
  });
  const data = await res.json().catch(()=>null);
  if (!res.ok) throw new Error(data?.error || 'Error subiendo a Cloudinary');
  return data; // { evidenciaId, url, ... }
}

export const tzOffsetMinutes = () => -new Date().getTimezoneOffset();
