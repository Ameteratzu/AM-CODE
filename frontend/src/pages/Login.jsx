import { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('ana@amcode.com');  // demo
  const [password, setPassword] = useState('ana123');    // demo
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      setLoading(true); setError('');
      await login(email, password);
      navigate('/asistencia', { replace:true });
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-gray-100 p-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
        <h1 className="mb-5 text-2xl font-extrabold">
          <span className="bg-gradient-to-r from-[#BD52FF] to-fuchsia-500 bg-clip-text text-transparent">Iniciar sesión</span>
        </h1>
        {error && <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">{error}</div>}
        <label className="block text-sm text-gray-600">Correo</label>
        <input className="mb-3 mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none ring-[#BD52FF]/30 focus:ring-4"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block text-sm text-gray-600">Contraseña</label>
        <input type="password" className="mb-5 mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none ring-[#BD52FF]/30 focus:ring-4"
               value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full rounded-xl bg-[#BD52FF] px-4 py-2 font-semibold text-white hover:brightness-95 disabled:opacity-60">
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
