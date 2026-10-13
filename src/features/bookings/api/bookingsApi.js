import { appPath } from '../../../app/paths.js';

export class BookingApiError extends Error {
  constructor(message, fields = {}) { super(message); this.name = 'BookingApiError'; this.fields = fields; }
}

export async function createBooking(booking, signal) {
  let response;
  try { response = await fetch(appPath('/api/bookings.php'), { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(booking), signal }); }
  catch (error) { if (error.name === 'AbortError') throw error; throw new BookingApiError('We could not reach the booking service. Please check your connection and try again.'); }
  let payload;
  try { payload = await response.json(); } catch { throw new BookingApiError('The booking service returned an invalid response.'); }
  if (!response.ok || !payload?.success) throw new BookingApiError(payload?.error?.message || 'We could not save your request. Please try again.', payload?.error?.fields || {});
  return payload.data;
}
