// frontend/src/pages/Capture.jsx
import { useEffect, useRef, useState } from 'react';
import { uploadToCloudinary } from '../services/api';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return Object.fromEntries(new URLSearchParams(search));
}

export default function Capture() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [recording, setRecording] = useState(false);
  const [lastUrl, setLastUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [note, setNote] = useState('');

  const { marcacionId } = useQuery(); // si vienes desde una acción, vendrá aquí

  useEffect(() => () => stopStream(), []);

  async function startShare() {
    try {
      setMsg('');
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      setMsg(e.message || 'No se pudo iniciar la captura de pantalla');
    }
  }

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
    }
  }

  async function takeScreenshot() {
    try {
      if (!streamRef.current) return setMsg('Primero inicia la captura de pantalla');
      const video = videoRef.current;
      // esperar a que el video tenga dimensiones
      if (!video.videoWidth || !video.videoHeight) {
        await new Promise(r => setTimeout(r, 200));
      }
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise(res => canvas.toBlob(res, 'image/png', 0.95));
      const { url } = await uploadToCloudinary(blob, {
        folder: 'amcode/attendance/screenshots',
        kind: 'SCREENSHOT',
        marcacionId: marcacionId ? Number(marcacionId) : undefined,
        note
      });
      setLastUrl(url);
      setMsg('Captura subida ✔️');
    } catch (e) {
      setMsg(e.message || 'Error al subir captura');
    }
  }

  function startRecording() {
    if (!streamRef.current) return setMsg('Primero inicia la captura de pantalla');
    setMsg('');
    chunksRef.current = [];
    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm';
    const rec = new MediaRecorder(streamRef.current, { mimeType: mime, bitsPerSecond: 2_500_000 });
    recorderRef.current = rec;
    rec.ondataavailable = (e) => { if (e.data && e.data.size) chunksRef.current.push(e.data); };
    rec.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: rec.mimeType });
      try {
        const { url } = await uploadToCloudinary(blob, {
          folder: 'amcode/attendance/recordings',
          kind: 'RECORDING',
          marcacionId: marcacionId ? Number(marcacionId) : undefined,
          note
        });
        setLastUrl(url);
        setMsg('Grabación subida ✔️');
      } catch (e) {
        setMsg(e.message || 'Error al subir grabación');
      }
    };
    rec.start();
    setRecording(true);
  }

  function stopRecording() {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
      setRecording(false);
    }
  }

  async function onFilePick(e) {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const { url } = await uploadToCloudinary(file, {
        folder: 'amcode/attendance/uploads',
        kind: file.type.startsWith('video') ? 'RECORDING' : 'SCREENSHOT',
        marcacionId: marcacionId ? Number(marcacionId) : undefined,
        note
      });
      setLastUrl(url);
      setMsg('Archivo subido ✔️');
      e.target.value = '';
    } catch (err) {
      setMsg(err.message || 'Error al subir archivo');
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-[#BD52FF] to-fuchsia-500 bg-clip-text text-transparent">
            Capturas & Grabación
          </span>
        </h1>

        {marcacionId && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
            Asociando a marcación <b>#{marcacionId}</b>
          </div>
        )}

        {msg && (
          <div className="mb-4 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-violet-800">{msg}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Nota (opcional)</label>
          <input
            value={note}
            onChange={e=>setNote(e.target.value)}
            className="mt-1 w-full max-w-xl rounded-xl border border-gray-200 px-3 py-2 outline-none ring-[#BD52FF]/30 focus:ring-4"
            placeholder="Ej: Evidencia de entrada"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
            <div className="text-sm font-semibold text-gray-600 mb-3">Vista previa</div>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded-xl border border-gray-200"
              style={{ background: '#f8fafc', minHeight: 240 }}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={startShare} className="rounded-full bg-[#BD52FF] text-white px-4 py-2 text-sm font-semibold hover:brightness-95">
                Iniciar captura
              </button>
              <button onClick={stopStream} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:border-[#BD52FF] hover:text-[#BD52FF]">
                Detener captura
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]">
            <div className="text-sm font-semibold text-gray-600 mb-3">Acciones</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={takeScreenshot} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:border-[#BD52FF] hover:text-[#BD52FF]">
                Tomar captura
              </button>

              {!recording ? (
                <button onClick={startRecording} className="rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700">
                  Iniciar grabación
                </button>
              ) : (
                <button onClick={stopRecording} className="rounded-full bg-rose-600 text-white px-4 py-2 text-sm font-semibold hover:bg-rose-700">
                  Detener y subir
                </button>
              )}

              <label className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:border-[#BD52FF] hover:text-[#BD52FF] cursor-pointer">
                Subir archivo…
                <input type="file" accept="image/*,video/*" className="hidden" onChange={onFilePick} />
              </label>
            </div>

            {lastUrl && (
              <div className="mt-4 text-sm">
                <div className="text-gray-600">Último archivo subido:</div>
                <a href={lastUrl} target="_blank" rel="noreferrer" className="text-[#BD52FF] underline break-all">
                  {lastUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Nota: los navegadores permiten capturar pantalla en HTTPS o localhost y siempre pedirán permiso al usuario.
        </p>
      </div>
    </div>
  );
}
