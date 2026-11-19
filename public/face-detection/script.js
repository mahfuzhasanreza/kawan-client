// Kawan Mood Check: detects facial expressions locally with face-api.js, runs a short
// averaged scan, and can send the result to the Kawan chatbot for feedback.
const $ = (id) => document.getElementById(id);
const video = $('video');
const stage = document.querySelector('.stage');

// Models live next to this page (public/face-detection/models).
const MODEL_URL = new URL('models', window.location.href).href;

const SCAN_MS = 4000;
const MAX_SCAN_MS = 10000; // slow devices: keep scanning until enough frames
const MIN_FACE_FRAMES = 5;
const DETECTOR_OPTIONS = { inputSize: 416, scoreThreshold: 0.4 };
const HISTORY_KEY = 'kawan:moodHistory';
const PENDING_KEY = 'kawan:pendingMoodCheckin';
const HISTORY_LIMIT = 20;

const MOODS = {
  happy: { emoji: '😊', label: 'Happy', tip: "Love to see it! Hold on to what's making you smile." },
  neutral: { emoji: '😐', label: 'Calm', tip: 'Feeling steady. A good moment for a short mindful breath.' },
  sad: { emoji: '😢', label: 'Sad', tip: "It's okay to feel low. Talking about it can help." },
  angry: { emoji: '😠', label: 'Upset', tip: 'Try breathing in for 4, holding for 4, and out for 6.' },
  fearful: { emoji: '😨', label: 'Anxious', tip: 'You are safe right now. Slow breaths can help calm your body.' },
  disgusted: { emoji: '😖', label: 'Uncomfortable', tip: 'Take a short break and step away for a moment.' },
  surprised: { emoji: '😮', label: 'Surprised', tip: 'Something caught you off guard! Take a breath and reset.' },
};
const FEELINGS = ['Happy', 'Calm', 'Grateful', 'Tired', 'Stressed', 'Anxious', 'Sad', 'Lonely', 'Angry', 'Overwhelmed'];

let canvas;
let running = false;
let scan = null; // { start, frames, sums }
let result = null; // last scan result
let selectedFeeling = '';

// ---------- small helpers ----------
const setStatus = (text, isError = false) => {
  $('status').textContent = text;
  $('status').classList.toggle('error', isError);
};
const pct = (n) => `${Math.round(n * 100)}%`;
const storage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
};
const timeAgo = (iso) => {
  const mins = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};

// ---------- camera ----------
const cameraErrorMessage = (err) => {
  switch (err && err.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Camera access was blocked. Allow camera permission for this site in your browser, then press "Try camera again".';
    case 'NotFoundError':
    case 'OverconstrainedError':
      return 'No camera was found on this device.';
    case 'NotReadableError':
      return 'Your camera is being used by another app. Close it and press "Try camera again".';
    default:
      return 'Could not start the camera. Please press "Try camera again".';
  }
};

async function loadModels() {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);
}

async function startVideo() {
  $('retry').hidden = true;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setStatus('This browser does not support camera access. Please try a recent Chrome, Edge, Firefox or Safari.', true);
    return;
  }
  setStatus('Starting camera…');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 540 } },
      audio: false,
    });
    video.srcObject = stream;
  } catch (err) {
    console.error(err);
    setStatus(cameraErrorMessage(err), true);
    $('retry').hidden = false;
  }
}

function stopVideo() {
  const stream = video.srcObject;
  if (stream) stream.getTracks().forEach((t) => t.stop());
  video.srcObject = null;
  running = false;
}

// Keep the overlay canvas the same size as the displayed video.
function syncCanvasSize() {
  const displaySize = { width: video.clientWidth, height: video.clientHeight };
  faceapi.matchDimensions(canvas, displaySize);
  return displaySize;
}

const topExpression = (expressions) =>
  Object.entries(expressions).sort((a, b) => b[1] - a[1])[0];

async function detectLoop() {
  if (!running) return;
  if (!document.hidden && video.readyState >= 2) {
    const displaySize = syncCanvasSize();
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions(DETECTOR_OPTIONS))
      .withFaceLandmarks(true)
      .withFaceExpressions();
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Use the biggest (closest) face.
    const face = detections.sort((a, b) => b.detection.box.area - a.detection.box.area)[0];
    if (face) {
      const resized = faceapi.resizeResults([face], displaySize);
      faceapi.draw.drawDetections(canvas, resized);
      const [name] = topExpression(face.expressions);
      $('live').textContent = `${MOODS[name].emoji} ${MOODS[name].label}`;
    } else {
      $('live').textContent = '';
    }

    if (scan) {
      updateScan(face);
    } else if (!result) {
      setStatus(face ? 'Face detected. Press "Check my mood" when you are ready.' : 'Looking for your face… make sure it is well lit and in view.');
    }
  }
  setTimeout(detectLoop, 120);
}

// ---------- scan ----------
function startScan() {
  scan = { start: performance.now(), frames: 0, sums: {} };
  result = null;
  $('result').hidden = true;
  $('sent').hidden = true;
  $('scan').disabled = true;
  $('progress').hidden = false;
  setStatus('Scanning… hold still and look at the camera.');
}

function updateScan(face) {
  if (face) {
    scan.frames += 1;
    for (const [name, value] of Object.entries(face.expressions)) {
      scan.sums[name] = (scan.sums[name] || 0) + value;
    }
  }
  const elapsed = performance.now() - scan.start;
  const target = scan.frames >= MIN_FACE_FRAMES ? SCAN_MS : MAX_SCAN_MS;
  $('progress-fill').style.width = `${Math.min(elapsed / Math.max(target, SCAN_MS), 1) * 100}%`;
  if (elapsed < SCAN_MS) return;
  if (scan.frames < MIN_FACE_FRAMES && elapsed < MAX_SCAN_MS) {
    setStatus('Still scanning… keep your face in view.');
    return;
  }

  const { frames, sums } = scan;
  scan = null;
  $('progress').hidden = true;
  $('progress-fill').style.width = '0';
  $('scan').disabled = false;

  if (frames < MIN_FACE_FRAMES) {
    setStatus("I couldn't see your face clearly. Face the camera in good light and try again.", true);
    return;
  }
  const scores = Object.fromEntries(Object.entries(sums).map(([k, v]) => [k, v / frames]));
  const [mood, confidence] = topExpression(scores);
  result = { mood, confidence, scores, at: new Date().toISOString() };
  showResult();
  setStatus('Here is your check-in. Add how you feel if you like, then send it to Kawan.');
}

function showResult() {
  const info = MOODS[result.mood];
  $('result-emoji').textContent = info.emoji;
  $('result-title').textContent = `You seem ${info.label.toLowerCase()} (${pct(result.confidence)})`;
  $('result-tip').textContent = info.tip;

  const bars = $('result-bars');
  bars.replaceChildren();
  Object.entries(result.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([name, value]) => {
      const row = document.createElement('div');
      row.className = 'bar';
      row.innerHTML = '<span></span><div class="bar-track"><div class="bar-fill"></div></div><span class="bar-value"></span>';
      row.children[0].textContent = `${MOODS[name].emoji} ${MOODS[name].label}`;
      row.querySelector('.bar-fill').style.width = pct(value);
      row.children[2].textContent = pct(value);
      bars.append(row);
    });

  selectedFeeling = '';
  $('note').value = '';
  renderFeelingChips();
  $('send').disabled = false;
  $('result').hidden = false;
  $('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderFeelingChips() {
  const wrap = $('feel-chips');
  wrap.replaceChildren();
  FEELINGS.forEach((feeling) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = feeling;
    chip.setAttribute('aria-pressed', String(feeling === selectedFeeling));
    chip.addEventListener('click', () => {
      selectedFeeling = selectedFeeling === feeling ? '' : feeling;
      renderFeelingChips();
    });
    wrap.append(chip);
  });
}

// ---------- history ----------
const getHistory = () => storage.get(HISTORY_KEY, []).filter((h) => h && MOODS[h.mood] && h.at);

function renderHistory() {
  const history = getHistory();
  $('history-card').hidden = history.length === 0;
  const list = $('history');
  list.replaceChildren();
  history.slice(0, 10).forEach((h) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.title = `${MOODS[h.mood].label}${h.selfReport ? ` · felt ${h.selfReport}` : ''}`;
    const emoji = document.createElement('span');
    emoji.textContent = MOODS[h.mood].emoji;
    item.append(emoji, timeAgo(h.at));
    list.append(item);
  });
}

// ---------- send to chat ----------
function sendToChat() {
  if (!result) return;
  const previous = getHistory();
  const checkin = {
    type: 'kawan-mood-checkin',
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    mood: result.mood,
    label: MOODS[result.mood].label,
    emoji: MOODS[result.mood].emoji,
    confidence: Number(result.confidence.toFixed(3)),
    scores: Object.fromEntries(Object.entries(result.scores).map(([k, v]) => [k, Number(v.toFixed(3))])),
    selfReport: selectedFeeling,
    note: $('note').value.trim().slice(0, 300),
    recent: previous.slice(0, 7).map(({ mood, at }) => ({ mood, at })),
    at: result.at,
  };

  storage.set(HISTORY_KEY, [{ mood: checkin.mood, selfReport: checkin.selfReport, at: checkin.at }, ...previous].slice(0, HISTORY_LIMIT));
  renderHistory();

  // Fallback: the chat picks this up when it next loads or regains focus.
  storage.set(PENDING_KEY, checkin);

  const opener = window.opener && !window.opener.closed ? window.opener : null;
  if (opener) {
    try {
      opener.postMessage(checkin, window.location.origin);
      opener.focus();
    } catch (err) {
      console.error(err);
    }
  }

  $('send').disabled = true;
  $('result').hidden = true;
  $('sent').hidden = false;
  setStatus('');
  stopVideo();
  $('live').textContent = '';
  $('scan').disabled = true;
  if (opener) setTimeout(() => window.close(), 600);
}

// ---------- wiring ----------
video.addEventListener('playing', () => {
  if (!canvas) {
    canvas = faceapi.createCanvasFromMedia(video);
    stage.append(canvas);
  }
  $('scan').disabled = false;
  if (!running) {
    running = true;
    detectLoop();
  }
});

$('scan').addEventListener('click', startScan);
$('again').addEventListener('click', startScan);
$('retry').addEventListener('click', startVideo);
$('send').addEventListener('click', sendToChat);
$('clear-history').addEventListener('click', () => {
  storage.remove(HISTORY_KEY);
  renderHistory();
});

renderHistory();
loadModels()
  .then(startVideo)
  .catch((err) => {
    console.error(err);
    setStatus('Could not load the face models. Check your connection and reload the page.', true);
  });
