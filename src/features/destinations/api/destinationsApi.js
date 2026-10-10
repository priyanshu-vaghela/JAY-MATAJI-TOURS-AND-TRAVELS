import { appPath } from '../../../app/paths.js';

export class DestinationApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'DestinationApiError';
    this.status = status;
  }
}

async function getJson(url, signal) {
  let response;

  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new DestinationApiError('We could not reach the travel service. Please check your connection and try again.');
  }

  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new DestinationApiError('The travel service returned an invalid response.', response.status);
  }

  if (!response.ok) {
    throw new DestinationApiError(payload?.error || 'The travel service could not complete the request.', response.status);
  }

  return payload;
}

export async function getDestinations(signal) {
  const payload = await getJson(appPath('/api/destinations.php'), signal);

  if (!Array.isArray(payload.destinations)) {
    throw new DestinationApiError('The destination list is not available right now.');
  }

  return payload.destinations;
}

export async function getDestination(id, signal) {
  const payload = await getJson(appPath(`/api/destination.php?id=${encodeURIComponent(id)}`), signal);

  if (!payload.destination || !Array.isArray(payload.attractions)) {
    throw new DestinationApiError('The destination details are not available right now.');
  }

  return payload;
}
