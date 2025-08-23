const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Login fallido');
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export async function me() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const res = await fetch(`${API}/auth/me`, { headers: { Authorization:`Bearer ${token}` } });
  if (!res.ok) return null;
  return res.json();
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getToken(){ return localStorage.getItem('token'); }
export function getUser(){ try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } }
