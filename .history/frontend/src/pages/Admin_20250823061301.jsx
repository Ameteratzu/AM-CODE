import { useEffect, useState } from 'react';
import { getUser } from '../services/auth';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const BRAND = {
  primary: '#644F9E',
  secondary: '#502A49',
  dark: '#372958',
  muted: '#382F41',
};

export default function Admin() {
  const me = getUser();
  const [usuarios, setUsuarios] = useState([]);
  const [sel, setSel] = useState('');
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!['ADMIN', 'MANAGER'].includes(me?.rol)) {
      setMsg('No autorizado');
      return;
    }
    loadUsers();
    // eslint-disable-next-line
  }, []);

  async function loadUsers() {
    try {
      setMsg('');
      const res = await fetch(`${API}/usuarios`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Error usuarios');
      setUsuarios(data);
    } catch (e) {
      setMsg(e.message || 'Error');
    }
  }

  async function loadEvidencias(uid) {
    try {
      setSel(uid);
      setRows([]);
      if (!uid) return;
      const res = await fetch(`${API}/evidencias?usuarioId=${uid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Error evidencias');
      setRows(data);
    } catch (e) {
      setMsg(e.message || 'Error');
    }
  }

  if (!['ADMIN', 'MANAGER'].includes(me?.rol)) {
    return <div className="p-6 text-rose-600">No autorizado</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-4">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})` }}
          >
            Panel Admin — Evidencias
          </span>
        </h1>

        {msg && (
          <div
            className="mb-4 rounded-xl px-4 py-3"
            style={{
              backgroundColor: `${BRAND.primary}14`,
              border: `1px solid ${BRAND.primary}33`,
              color: BRAND.primary,
            }}
          >
            {msg}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1" style={{ color: BRAND.muted }}>
            Selecciona usuario
          </label>
          <select
            className="w-full max-w-md rounded-xl px-3 py-2"
            value={sel}
            onChange={(e) => loadEvidencias(e.target.value)}
            style={{
              border: `1px solid #e5e7eb`,
              outline: 'none',
              boxShadow: 'none',
            }}
          >
            <option value="">—</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} — {u.email}
              </option>
            ))}
          </select>
        </div>

        <div
          className="overflow-hidden rounded-2xl bg-white"
          style={{
            border: `1px solid #e5e7eb`,
            boxShadow: '0 10px 30px -12px rgba(0,0,0,.15)',
          }}
        >
          <div
            className="px-5 py-3 text-sm font-semibold uppercase tracking-wider"
            style={{ borderBottom: '1px solid #e5e7eb', color: BRAND.muted }}
          >
            Evidencias (máx. 100)
          </div>
          <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {rows.map((r) => (
              <div
                key={r.id}
                className="rounded-xl p-3"
                style={{ border: '1px solid #eef2f7', background: '#fff' }}
              >
                <div className="text-xs mb-1" style={{ color: BRAND.muted }}>
                  {new Date(r.createdAt).toLocaleString()} · {r.kind} · {r.resource}
                </div>
                {r.resource === 'image' ? (
                  <a href={r.url} target="_blank" rel="noreferrer">
                    <img
                      src={r.url}
                      alt=""
                      className="w-full h-40 object-cover rounded-lg border"
                      style={{ borderColor: '#eef2f7' }}
                    />
                  </a>
                ) : (
                  <video
                    src={r.url}
                    controls
                    className="w-full h-40 object-cover rounded-lg border"
                    style={{ borderColor: '#eef2f7' }}
                  />
                )}
                {r.note && <div className="mt-2 text-sm" style={{ color: BRAND.dark }}>{r.note}</div>}
              </div>
            ))}
            {!rows.length && <div className="text-sm text-gray-500 px-2">Sin evidencias</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
