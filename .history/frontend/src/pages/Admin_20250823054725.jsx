// frontend/src/pages/Admin.jsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { getUser } from '../services/auth';

export default function Admin() {
  const me = getUser();
  const [usuarios, setUsuarios] = useState([]);
  const [sel, setSel] = useState('');
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!['ADMIN','MANAGER'].includes(me?.rol)) {
      setMsg('No autorizado'); return;
    }
    loadUsers();
  // eslint-disable-next-line
  }, []);

  async function loadUsers() {
    try {
      setMsg('');
      const list = await api.meToday(0).catch(()=>null); // para validar token
      const us = await fetchUsers();
      setUsuarios(us);
    } catch (e) {
      setMsg(e.message || 'Error');
    }
  }

  async function fetchUsers() {
    const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000/api'}/usuarios`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error usuarios');
    return data;
  }

  async function loadEvidencias(uid) {
    setSel(uid);
    setRows([]);
    if (!uid) return;
    const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000/api'}/evidencias?usuarioId=${uid}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error evidencias');
    setRows(data);
  }

  if (!['ADMIN','MANAGER'].includes(me?.rol)) {
    return <div className="p-6 text-rose-600">No autorizado</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-[#BD52FF] to-fuchsia-500 bg-clip-text text-transparent">
            Panel Admin — Evidencias
          </span>
        </h1>

        {msg && <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">{msg}</div>}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Selecciona usuario</label>
          <select
            className="w-full max-w-md rounded-xl border border-gray-200 px-3 py-2"
            value={sel}
            onChange={(e)=>loadEvidencias(e.target.value)}
          >
            <option value="">—</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.nombre} — {u.email}</option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
          <div className="border-b border-gray-100 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Evidencias (máx. 100)
          </div>
          <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {rows.map(r => (
              <div key={r.id} className="rounded-xl border border-gray-100 p-3">
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(r.createdAt).toLocaleString()} · {r.kind} · {r.resource}
                </div>
                {r.resource === 'image' ? (
                  <a href={r.url} target="_blank" rel="noreferrer">
                    <img src={r.url} alt="" className="w-full h-40 object-cover rounded-lg border" />
                  </a>
                ) : (
                  <video src={r.url} controls className="w-full h-40 object-cover rounded-lg border" />
                )}
                {r.note && <div className="mt-2 text-sm text-gray-700">{r.note}</div>}
              </div>
            ))}
            {!rows.length && <div className="text-sm text-gray-500 px-2">Sin evidencias</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
