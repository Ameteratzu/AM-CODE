// frontend/src/pages/Attendance.jsx
import { useEffect, useMemo, useState } from 'react'
import { api, tzOffsetMinutes } from '../services/api'

function fmtDate(s) {
  const d = new Date(s)
  return d.toLocaleString()
}

export default function Attendance() {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(null)
  const [day, setDay] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const offset = useMemo(() => tzOffsetMinutes(), [])

  async function loadUsers() {
    const list = await api.users()
    setUsers(list)
    if (!userId && list.length) setUserId(list[0].id)
  }

  async function loadToday(uId = userId) {
    if (!uId) return
    const data = await api.today(uId, offset)
    setDay(data)
  }

  useEffect(() => { loadUsers() }, [])
  useEffect(() => { if (userId) loadToday(userId) }, [userId])

  async function action(fn) {
    try {
      setLoading(true)
      setMsg('')
      await fn()
      await loadToday()
    } catch (e) {
      setMsg(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const estado = day?.estado ?? '...'
  const allow = {
    clockIn: estado === 'FUERA',
    clockOut: estado === 'TRABAJANDO' || estado === 'EN_PAUSA', // server evita salir en pausa
    breakStart: estado === 'TRABAJANDO',
    breakEnd: estado === 'EN_PAUSA',
  }

  const lastPunch = day?.punches?.[day.punches.length - 1] ?? null
  const lastPauseKind = lastPunch?.tipo?.startsWith('BREAK_') ? 'BREAK'
                      : lastPunch?.tipo?.startsWith('LUNCH_') ? 'LUNCH'
                      : lastPunch?.tipo?.startsWith('TOILET_') ? 'TOILET'
                      : null

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 16, fontFamily: 'Inter, system-ui, Arial' }}>
      <h1 style={{ marginBottom: 8 }}>Asistencia AM-CODE</h1>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <label>Empleado:</label>
        <select value={userId ?? ''} onChange={e => setUserId(Number(e.target.value))}>
          {users.map(u => <option key={u.id} value={u.id}>{u.nombre} ({u.email})</option>)}
        </select>
        <button onClick={() => loadToday()} disabled={!userId || loading}>Actualizar</button>
      </div>

      {msg && <div style={{ background: '#ffe2e2', color: '#b10000', padding: '8px 12px', borderRadius: 8, marginBottom: 12 }}>{msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: '#888' }}>Estado actual</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>
            {estado === 'TRABAJANDO' ? '🟢 Trabajando'
            : estado === 'EN_PAUSA' ? '🟡 En Pausa'
            : '🔴 Fuera'}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            Última marca: {lastPunch ? `${lastPunch.tipo} · ${fmtDate(lastPunch.at)}` : '—'}
          </div>
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: '#888' }}>Hoy</div>
          <div style={{ marginTop: 6 }}>
            <b>Trabajo:</b> {day?.totalTrabajoMin ?? 0} min &nbsp;|&nbsp;
            <b>Pausas:</b> {day?.totalPausaMin ?? 0} min
          </div>
        </div>
      </div>

      <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Acciones</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button disabled={!allow.clockIn || loading} onClick={() => action(() => api.clockIn(userId))}>Entrar</button>
          <button disabled={!allow.breakStart || loading} onClick={() => action(() => api.breakStart(userId, 'BREAK'))}>Iniciar Pausa</button>
          <button disabled={!allow.breakStart || loading} onClick={() => action(() => api.breakStart(userId, 'LUNCH'))}>Iniciar Almuerzo</button>
          <button disabled={!allow.breakStart || loading} onClick={() => action(() => api.breakStart(userId, 'TOILET'))}>Iniciar Baño</button>

          <button disabled={!allow.breakEnd || loading || !lastPauseKind} onClick={() => action(() => api.breakEnd(userId, lastPauseKind))}>
            Terminar {lastPauseKind === 'LUNCH' ? 'Almuerzo' : lastPauseKind === 'TOILET' ? 'Baño' : 'Pausa'}
          </button>

          <button disabled={!allow.clockOut || loading} onClick={() => action(() => api.clockOut(userId))}>Salir</button>
        </div>
      </div>

      <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Marcaciones de hoy</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>Tipo</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>Fecha y hora</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 8 }}>Nota</th>
              </tr>
            </thead>
            <tbody>
              {day?.punches?.length ? day.punches.map(p => (
                <tr key={p.id}>
                  <td style={{ padding: 8 }}>{p.tipo}</td>
                  <td style={{ padding: 8 }}>{fmtDate(p.at)}</td>
                  <td style={{ padding: 8 }}>{p.note ?? '—'}</td>
                </tr>
              )) : (
                <tr><td colSpan={3} style={{ padding: 8, color: '#666' }}>Sin registros hoy</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
