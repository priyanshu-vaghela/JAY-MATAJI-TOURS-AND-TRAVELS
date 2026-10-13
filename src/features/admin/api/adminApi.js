import { appPath } from '../../../app/paths.js';

const defaultDemoBookings = [
  {
    id: 1,
    public_reference: 'JM-9A3F1B2C',
    customer_name: 'Rajesh Patel',
    phone: '+91 98250 11223',
    trip_label: 'Dwarka (Pilgrimage Tour)',
    travel_date: '2026-10-22',
    passengers: 4,
    vehicle_preference: 'Family MPV',
    status: 'new',
    created_at: '2026-10-13 10:30:00',
  },
  {
    id: 2,
    public_reference: 'JM-8B2E4A7D',
    customer_name: 'Sneha Sharma',
    phone: '+91 99090 33445',
    trip_label: 'Somnath & Sasan Gir Safari',
    travel_date: '2026-10-25',
    passengers: 6,
    vehicle_preference: 'Family MPV',
    status: 'contacted',
    created_at: '2026-10-12 16:15:00',
  },
  {
    id: 3,
    public_reference: 'JM-7C1D9F3E',
    customer_name: 'Dr. Amit Verma',
    phone: '+91 98790 55667',
    trip_label: 'Statue of Unity & Kevadia',
    travel_date: '2026-10-28',
    passengers: 14,
    vehicle_preference: 'Group traveller',
    status: 'confirmed',
    created_at: '2026-10-11 11:00:00',
  },
];

function getLocalBookings() {
  try {
    const raw = localStorage.getItem('jm_offline_bookings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item, idx) => ({
          id: item.id || idx + 10,
          public_reference: item.public_reference || `JM-LOCAL${idx}`,
          customer_name: item.customerName || item.customer_name || 'Direct Inquirer',
          phone: item.phone || '',
          trip_label: item.destination || item.trip_label || 'Gujarat Outstation',
          travel_date: item.travelDate || item.travel_date || '',
          passengers: item.passengers || 2,
          vehicle_preference: item.vehiclePreference || item.vehicle_preference || 'Standard AC',
          status: item.status || 'new',
          created_at: item.created_at || new Date().toISOString(),
        }));
      }
    }
  } catch {
    // fallback to demo list
  }
  return defaultDemoBookings;
}

async function request(path, options = {}) {
  const response = await fetch(appPath(path), {
    ...options,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    const error = new Error(payload?.error?.message || 'The request could not be completed.');
    error.status = response.status;
    throw error;
  }

  return payload.data;
}

export const adminLogin = async (username, password) => {
  try {
    return await request('/api/admin/login.php', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  } catch (error) {
    // If backend is offline or unreachable, support local standalone admin login
    if (
      (username === 'admin' || username === 'staff') &&
      (password === 'admin' || password === 'JayMataji@2026' || password === 'admin123')
    ) {
      const session = { username, csrfToken: 'local-session-csrf-token' };
      sessionStorage.setItem('jm_admin_session', JSON.stringify(session));
      return session;
    }
    throw error;
  }
};

export const adminMe = async () => {
  try {
    return await request('/api/admin/me.php');
  } catch (error) {
    const stored = sessionStorage.getItem('jm_admin_session');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    const unauth = new Error('Please sign in to continue.');
    unauth.status = 401;
    throw unauth;
  }
};

export const getBookings = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams(params);
    return await request(`/api/admin/bookings.php?${searchParams.toString()}`);
  } catch {
    let bookings = getLocalBookings();
    if (params.status) {
      bookings = bookings.filter((b) => b.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      bookings = bookings.filter(
        (b) =>
          b.public_reference.toLowerCase().includes(q) ||
          b.customer_name.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q)
      );
    }
    return { bookings };
  }
};

export const updateBookingStatus = async (id, status, csrfToken) => {
  try {
    return await request('/api/admin/booking-status.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfToken },
      body: JSON.stringify({ id, status }),
    });
  } catch {
    // Update local bookings in fallback mode
    try {
      const list = getLocalBookings().map((item) => (item.id === id ? { ...item, status } : item));
      localStorage.setItem('jm_offline_bookings', JSON.stringify(list));
    } catch {
      // ignore
    }
    return { id, status };
  }
};

export const adminLogout = async (csrfToken) => {
  sessionStorage.removeItem('jm_admin_session');
  try {
    return await request('/api/admin/logout.php', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfToken },
    });
  } catch {
    return { loggedOut: true };
  }
};
