import { getToken } from './auth';
const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

async function request(path, { method='GET', body, headers={} } = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type':'application/json', ...(token ? { Authorization:`Bearer ${token}` } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });
  const data = await res.json().catch(()=>null);
  if (!res.ok) throw new Error(data?.error || data?.message || `Error ${res.status}`);
  return data;
}

export const api = {
  meToday: (offsetMin) => request(`/me/hoy?offset=${offsetMin}`),
  clockIn:  (extra={}) => request('/punch/clock-in',  { method:'POST', body: { ...extra } }),
  clockOut: (extra={}) => request('/punch/clock-out', { method:'POST', body: { ...extra } }),
  breakStart: (kind, extra={}) => request('/punch/break/start', { method:'POST', body:{ kind, ...extra } }),
  breakEnd:   (kind, extra={}) => request('/punch/break/end',   { method:'POST', body:{ kind, ...extra } }),
};

export const tzOffsetMinutes = () => -new Date().getTimezoneOffset();
