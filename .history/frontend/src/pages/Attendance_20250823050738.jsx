// frontend/src/pages/Attendance.jsx
import { useEffect, useMemo, useState } from "react";
import { api, tzOffsetMinutes } from "../services/api";

// Utilidades de formato
const fmtDate = (s) => new Date(s).toLocaleString();
const cx = (...cls) => cls.filter(Boolean).join(" ");

export default function Attendance() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [day, setDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const offset = useMemo(() => tzOffsetMinutes(), []);

  // Cargar usuarios y día
  useEffect(() => {
    (async () => {
      const list = await api.users();
      setUsers(list);
      if (!userId && list.length) setUserId(list[0].id);
    })();
  }, []);

  useEffect(() => {
    if (userId) loadToday(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function loadToday(uId = userId) {
    const data = await api.today(uId, offset);
    setDay(data);
  }

  async function action(fn) {
    try {
      setLoading(true);
      setMsg("");
      await fn();
      await loadToday();
    } catch (e) {
      setMsg(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  const estado = day?.estado ?? "FUERA";
  const lastPunch = day?.punches?.[day.punches.length - 1] ?? null;

  const allow = {
    clockIn: estado === "FUERA",
    clockOut: estado === "TRABAJANDO" || estado === "EN_PAUSA",
    breakStart: estado === "TRABAJANDO",
    breakEnd: estado === "EN_PAUSA",
  };

  const lastPauseKind =
    lastPunch?.tipo?.startsWith("BREAK_")
      ? "BREAK"
      : lastPunch?.tipo?.startsWith("LUNCH_")
      ? "LUNCH"
      : lastPunch?.tipo?.startsWith("TOILET_")
      ? "TOILET"
      : null;

  // Estilos de estado
  const statusMap = {
    TRABAJANDO: { label: "Trabajando", dot: "bg-emerald-500" },
    EN_PAUSA: { label: "En pausa", dot: "bg-amber-400" },
    FUERA: { label: "Fuera", dot: "bg-rose-500" },
  };
  const status = statusMap[estado] || statusMap.FUERA;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      {/* Contenedor principal */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Título + selector */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-[#BD52FF] to-fuchsia-500 bg-clip-text text-transparent">
              Asistencia AM-CODE
            </span>
          </h1>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Empleado:</label>
            <select
              value={userId ?? ""}
              onChange={(e) => setUserId(Number(e.target.value))}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-[#BD52FF]/30 focus:ring-4"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} ({u.email})
                </option>
              ))}
            </select>
            <button
              onClick={() => loadToday()}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold hover:border-[#BD52FF] hover:text-[#BD52FF]"
            >
              Actualizar
            </button>
          </div>
        </div>

        {/* Alert de error */}
        {msg && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
            {msg}
          </div>
        )}

        {/* Tarjetas superiores */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Estado */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Estado actual
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className={cx("h-4 w-4 rounded-full", status.dot)} />
              <div className="text-2xl font-bold">{status.label}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Última marca:{" "}
              {lastPunch ? `${lastPunch.tipo} · ${fmtDate(lastPunch.at)}` : "—"}
            </div>
          </div>

          {/* Totales del día */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Hoy
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-gray-700">
                  Trabajo:
                  <span className="ml-1 font-semibold">
                    {day?.totalTrabajoMin ?? 0} min
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-gray-700">
                  Pausas:
                  <span className="ml-1 font-semibold">
                    {day?.totalPausaMin ?? 0} min
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Acciones
          </div>

          <div className="flex flex-wrap gap-8">
            {/* Grupo principal: Entrar / Salir */}
            <div className="flex items-center gap-2">
              <button
                disabled={!allow.clockIn || loading}
                onClick={() => action(() => api.clockIn(userId))}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  "bg-emerald-600 text-white shadow hover:bg-emerald-700",
                  (!allow.clockIn || loading) && "cursor-not-allowed opacity-60"
                )}
              >
                Entrar
              </button>

              <button
                disabled={!allow.clockOut || loading}
                onClick={() => action(() => api.clockOut(userId))}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  "bg-rose-600 text-white shadow hover:bg-rose-700",
                  (!allow.clockOut || loading) && "cursor-not-allowed opacity-60"
                )}
              >
                Salir
              </button>
            </div>

            {/* Grupo pausas */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Pausas
              </span>

              <button
                disabled={!allow.breakStart || loading}
                onClick={() => action(() => api.breakStart(userId, "BREAK"))}
                className={cx(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  "border-gray-200 text-gray-700 hover:border-[#BD52FF] hover:text-[#BD52FF]",
                  (!allow.breakStart || loading) && "cursor-not-allowed opacity-60"
                )}
              >
                Iniciar Pausa
              </button>

              <button
                disabled={!allow.breakStart || loading}
                onClick={() => action(() => api.breakStart(userId, "LUNCH"))}
                className={cx(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  "border-gray-200 text-gray-700 hover:border-[#BD52FF] hover:text-[#BD52FF]",
                  (!allow.breakStart || loading) && "cursor-not-allowed opacity-60"
                )}
              >
                Iniciar Almuerzo
              </button>

              <button
                disabled={!allow.breakStart || loading}
                onClick={() => action(() => api.breakStart(userId, "TOILET"))}
                className={cx(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  "border-gray-200 text-gray-700 hover:border-[#BD52FF] hover:text-[#BD52FF]",
                  (!allow.breakStart || loading) && "cursor-not-allowed opacity-60"
                )}
              >
                Iniciar Baño
              </button>

              <button
                disabled={!allow.breakEnd || loading || !lastPauseKind}
                onClick={() => action(() => api.breakEnd(userId, lastPauseKind))}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  "bg-[#BD52FF] text-white shadow hover:brightness-95",
                  (!allow.breakEnd || loading || !lastPauseKind) &&
                    "cursor-not-allowed opacity-60"
                )}
              >
                Terminar Pausa
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de marcaciones */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
          <div className="border-b border-gray-100 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Marcaciones de hoy
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/60">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Tipo
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Fecha y hora
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Nota
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {day?.punches?.length ? (
                  day.punches.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-sm text-gray-800">{p.tipo}</td>
                      <td className="px-5 py-3 text-sm text-gray-800">{fmtDate(p.at)}</td>
                      <td className="px-5 py-3 text-sm text-gray-500">{p.note ?? "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-6 text-center text-sm text-gray-500"
                    >
                      Sin registros hoy
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loader sutil */}
        {loading && (
          <div className="pointer-events-none fixed inset-x-0 bottom-6 mx-auto flex w-max items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm shadow">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#BD52FF]" />
            <span>Cargando…</span>
          </div>
        )}
      </div>
    </div>
  );
}
