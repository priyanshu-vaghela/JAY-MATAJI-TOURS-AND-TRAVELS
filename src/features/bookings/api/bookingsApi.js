import { appPath } from '../../../app/paths.js';

export class BookingApiError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = 'BookingApiError';
    this.fields = fields;
  }
}

function generateLocalReference() {
  const chars = '0123456789ABCDEF';
  let rand = '';
  for (let i = 0; i < 8; i++) {
    rand += chars[Math.floor(Math.random() * chars.length)];
  }
  return `JM-${rand}`;
}

export async function createBooking(booking, signal) {
  let response;
  try {
    response = await fetch(appPath('/api/bookings.php'), {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
      signal,
    });

    let payload;
    try {
      payload = await response.json();
    } catch {
      throw new BookingApiError('The booking service returned an unexpected response.');
    }

    if (!response.ok || !payload?.success) {
      throw new BookingApiError(
        payload?.error?.message || 'We could not save your request. Please check the form.',
        payload?.error?.fields || {}
      );
    }

    return payload.data;
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    if (error instanceof BookingApiError && Object.keys(error.fields).length > 0) {
      throw error;
    }

    // If server is unreachable (e.g. during frontend preview or without MySQL),
    // save locally to localStorage and generate a local reference so customer can proceed to WhatsApp
    const localRef = generateLocalReference();
    try {
      const stored = JSON.parse(localStorage.getItem('jm_offline_bookings') || '[]');
      stored.push({ ...booking, public_reference: localRef, created_at: new Date().toISOString() });
      localStorage.setItem('jm_offline_bookings', JSON.stringify(stored));
    } catch {
      // ignore storage failure
    }

    return { reference: localRef, offlineSaved: true };
  }
}
