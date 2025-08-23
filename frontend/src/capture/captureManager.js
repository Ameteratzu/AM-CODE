// frontend/src/capture/captureManager.js
import { uploadToCloudinary } from '../services/api';

const state = {
  stream: null,
  video: null,
  intervalId: null,
  running: false,
  periodMs: (Number(process.env.REACT_APP_CAPTURE_PERIOD_MIN) || 5) * 60 * 1000, // 5 min por defecto
  marcacionId: null,
};

async function ensureVideo() {
  if (!state.stream) {
    // Requiere gesto del usuario: llamamos esto justo después del CLOCK_IN (click del botón)
    state.stream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 5 }, // baja carga
      audio: false
    });
    state.stream.getVideoTracks()[0].addEventListener('ended', stop); // si el usuario corta la compartición
  }
  if (!state.video) {
    state.video = document.createElement('video');
    state.video.muted = true;
    state.video.playsInline = true;
    state.video.srcObject = state.stream;
    await state.video.play().catch(() => {});
  }
}

async function captureOnce() {
  if (!state.stream || !state.video) return;
  const vw = state.video.videoWidth || 1280;
  const vh = state.video.videoHeight || 720;
  if (!vw || !vh) return;

  const canvas = document.createElement('canvas');
  canvas.width = vw;
  canvas.height = vh;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(state.video, 0, 0, vw, vh);

  // JPEG más liviano que PNG
  const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.8));
  await uploadToCloudinary(blob, {
    folder: 'amcode/attendance/auto',
    kind: 'SCREENSHOT',
    marcacionId: state.marcacionId || undefined,
    note: `auto ${new Date().toISOString()}`
  });
}

export async function startAuto(marcacionId, opts = {}) {
  if (opts.periodMs) state.periodMs = opts.periodMs;
  state.marcacionId = marcacionId || state.marcacionId;
  await ensureVideo();
  // captura inmediata + cada N minutos
  await captureOnce();
  clearInterval(state.intervalId);
  state.intervalId = setInterval(captureOnce, state.periodMs);
  state.running = true;
}

export function pauseAuto() {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
  state.running = false;
}

export function resumeAuto() {
  if (state.stream && !state.intervalId) {
    state.intervalId = setInterval(captureOnce, state.periodMs);
    state.running = true;
  }
}

export function stop() {
  pauseAuto();
  if (state.stream) {
    state.stream.getTracks().forEach((t) => t.stop());
    state.stream = null;
  }
  if (state.video) {
    try { state.video.srcObject = null; } catch {}
    state.video.remove();
    state.video = null;
  }
  state.marcacionId = null;
}

export function isRunning() {
  return state.running;
}
