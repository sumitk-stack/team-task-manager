// ── API Base ──────────────────────────────────────────────────────────────────
const API_BASE = '';  // same origin

function getToken() { return localStorage.getItem('ttm_token'); }
function setToken(t) { localStorage.setItem('ttm_token', t); }
function clearToken() { localStorage.removeItem('ttm_token'); localStorage.removeItem('ttm_user'); }
function getUser() { try { return JSON.parse(localStorage.getItem('ttm_user')); } catch { return null; } }
function setUser(u) { localStorage.setItem('ttm_user', JSON.stringify(u)); }

async function apiFetch(path, opts = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...opts.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + path, { ...opts, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ── Auth API ──────────────────────────────────────────────────────────────────
const Auth = {
  signup: (name, email, password) =>
    apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  login: (email, password) =>
    apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => apiFetch('/api/auth/me'),
};

// ── Projects API ──────────────────────────────────────────────────────────────
const Projects = {
  list: () => apiFetch('/api/projects'),
  get: (id) => apiFetch(`/api/projects/${id}`),
  create: (data) => apiFetch('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/api/projects/${id}`, { method: 'DELETE' }),
  addMember: (id, email, role) =>
    apiFetch(`/api/projects/${id}/members`, { method: 'POST', body: JSON.stringify({ email, role }) }),
  removeMember: (id, userId) =>
    apiFetch(`/api/projects/${id}/members/${userId}`, { method: 'DELETE' }),
};

// ── Tasks API ─────────────────────────────────────────────────────────────────
const Tasks = {
  list: (projectId) => apiFetch(`/api/projects/${projectId}/tasks`),
  create: (projectId, data) =>
    apiFetch(`/api/projects/${projectId}/tasks`, { method: 'POST', body: JSON.stringify(data) }),
  update: (taskId, data) =>
    apiFetch(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (taskId) => apiFetch(`/api/tasks/${taskId}`, { method: 'DELETE' }),
};

// ── Dashboard API ─────────────────────────────────────────────────────────────
const Dashboard = { stats: () => apiFetch('/api/dashboard') };

// ── UI Helpers ────────────────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  el.innerHTML = `<span>${icons[type] || ''}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.4s forwards';
    setTimeout(() => el.remove(), 400);
  }, 3500);
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

function avatarInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(dateStr, status) {
  if (!dateStr || status === 'done') return false;
  return new Date(dateStr) < new Date();
}

function priorityBadge(p) {
  const labels = { low: '↓ Low', medium: '→ Med', high: '↑ High' };
  return `<span class="badge badge-${p}">${labels[p] || p}</span>`;
}
function statusBadge(s) {
  const labels = { todo: '📋 To Do', in_progress: '⚡ In Progress', done: '✅ Done' };
  return `<span class="badge badge-${s}">${labels[s] || s}</span>`;
}

function requireAuth() {
  if (!getToken()) { window.location.href = '/index.html'; return false; }
  return true;
}

function logout() {
  clearToken();
  window.location.href = '/index.html';
}
