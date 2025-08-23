import { useEffect, useRef, useState } from 'react';
import { uploadToCloudinary } from '../services/api';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return Object.fromEntries(new URLSearchParams(search));
}

// Colores de marca
const BRAND = {
  primary: '#644F9E',
  secondary: '#502A49',
  dark: '#372958',
  muted: '#382F41',
};

export default function Capture() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [recording, setRecording] = useState(false);
  const [lastUrl, setLastUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [note, setNote] = useState('');

  const { marcacionId } = useQuery();

  useEffect(() => () => stopStream(), []);

  async function startShare() {
    try {
      setMsg('');
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: false,
      });
      streamRef.current = stream;
      streamRef.current.getVideoTracks()[0].addEventListener('ended', stopStream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (e) {
      setMsg(e.message || 'No se pudo iniciar la captura de pantalla');
    }
  }

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  async function takeScreenshot() {
    try {
      if (!streamRef.current) return setMsg('Primero inicia la captura de pantalla');
      const video = videoRef.current;
      if (!video.videoWidth || !video.videoHeight) {
        await new Promise((r) => setTimeout(r, 200));
      }
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.85));
      const { url } = await uploadToCloudinary(blob, {
        folder: 'amcode/attendance/screenshots',
        kind: 'SCREENSHOT',
        marcacionId: marcacionId ? Number(marcacionId) : undefined,
        note,
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
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size) chunksRef.current.push(e.data);
    };
    rec.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: rec.mimeType });
      try {
        const { url } = await uploadToCloudinary(blob, {
          folder: 'amcode/attendance/recordings',
          kind: 'RECORDING',
          marcacionId: marcacionId ? Number(marcacionId) : undefined,
          note,
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
        note,
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
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.secondary}, ${BRAND.primary})` }}
          >
            Capturas & Grabación
          </span>
        </h1>

        {marcacionId && (
          <div
            className="mb-4 rounded-xl px-4 py-3"
            style={{
              backgroundColor: `${BRAND.dark}10`,
              border: `1px solid ${BRAND.dark}30`,
              color: BRAND.dark,
            }}
          >
            Asociando a marcación <b>#{marcacionId}</b>
          </div>
        )}

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

        <div className="grid gap-4 md:grid-cols-2">
          <div
            className="rounded-2xl bg-white p-5"
            style={{
              border: `1px solid #e5e7eb`,
              boxShadow: '0 10px 30px -12px rgba(0,0,0,.15)',
            }}
          >
            <div className="text-sm font-semibold" style={{ color: BRAND.muted }}>
              Vista previa
            </div>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded-xl border"
              style={{ background: '#f8fafc', minHeight: 240, borderColor: '#e5e7eb' }}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={startShare}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: BRAND.primary }}
              >
                Iniciar captura
              </button>
              <button
                onClick={stopStream}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  border: `1px solid ${BRAND.primary}`,
                  color: BRAND.primary,
                  background: 'white',
                }}
              >
                Detener captura
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl bg-white p-5"
            style={{
              border: `1px solid #e5e7eb`,
              boxShadow: '0 10px 30px -12px rgba(0,0,0,.15)',
            }}
          >
            <div className="text-sm font-semibold" style={{ color: BRAND.muted }}>
              Acciones
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={takeScreenshot}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  border: `1px solid ${BRAND.primary}`,
                  color: BRAND.primary,
                  background: 'white',
                }}
              >
                Tomar captura
              </button>

              {!recording ? (
                <button
                  onClick={startRecording}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: BRAND.secondary }}
                >
                  Iniciar grabación
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: BRAND.dark }}
                >
                  Detener y subir
                </button>
              )}

              <label
                className="rounded-full px-4 py-2 text-sm font-semibold cursor-pointer"
                style={{
                  border: `1px solid ${BRAND.primary}`,
                  color: BRAND.primary,
                  background: 'white',
                }}
              >
                Subir archivo…
                <input type="file" accept="image/*,video/*" className="hidden" onChange={onFilePick} />
              </label>
            </div>

            {lastUrl && (
              <div className="mt-4 text-sm">
                <div className="text-gray-600">Último archivo subido:</div>
                <a
                  href={lastUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline break-all"
                  style={{ color: BRAND.primary }}
                >
                  {lastUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Nota: los navegadores piden permiso para compartir pantalla; solo una vez por sesión.
        </p>
      </div>
    </div>
  );
}
