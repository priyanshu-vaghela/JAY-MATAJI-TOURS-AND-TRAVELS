import { appPath } from './paths.js';

async function getJson(url, signal) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  });

  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new Error('The travel service returned an invalid response.');
  }

  if (!response.ok) {
    throw new Error(payload?.error || 'The travel service could not complete the request.');
  }

  return payload;
}

export async function getDestinations(signal) {
  const payload = await getJson(appPath('/api/destinations.php'), signal);

  if (!Array.isArray(payload.destinations)) {
    throw new Error('The destination list is not available right now.');
  }

  return payload.destinations;
}

export async function getDestination(id, signal) {
  const payload = await getJson(appPath(`/api/destination.php?id=${encodeURIComponent(id)}`), signal);

  if (!payload.destination || !Array.isArray(payload.attractions)) {
    throw new Error('The destination details are not available right now.');
  }

  return payload;
}
