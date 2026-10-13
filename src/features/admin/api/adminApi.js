import { appPath } from '../../../app/paths.js';
async function request(path, options = {}) { const response = await fetch(appPath(path), { credentials: 'same-origin', headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) }, ...options }); const payload = await response.json().catch(() => null); if (!response.ok || !payload?.success) { const error = new Error(payload?.error?.message || 'The request could not be completed.'); error.status = response.status; throw error; } return payload.data; }
export const adminLogin = (username, password) => request('/api/admin/login.php', { method: 'POST', body: JSON.stringify({ username, password }) });
export const adminMe = () => request('/api/admin/me.php');
export const getBookings = (params) => request(`/api/admin/bookings.php?${new URLSearchParams(params)}`);
export const updateBookingStatus = (id, status, csrfToken) => request('/api/admin/booking-status.php', { method: 'POST', headers: { 'X-CSRF-Token': csrfToken }, body: JSON.stringify({ id, status }) });
export const adminLogout = (csrfToken) => request('/api/admin/logout.php', { method: 'POST', headers: { 'X-CSRF-Token': csrfToken } });
