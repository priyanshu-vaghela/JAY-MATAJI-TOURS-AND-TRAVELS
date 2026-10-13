import { appPath } from '../../../app/paths.js';
import { defaultDestinations } from '../data/defaultDestinations.js';

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
    throw new DestinationApiError('We could not reach the travel service.', 0);
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
  try {
    const payload = await getJson(appPath('/api/destinations.php'), signal);
    if (Array.isArray(payload.destinations) && payload.destinations.length > 0) {
      return payload.destinations;
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    // Fall back to built-in curated destinations if PHP/MySQL backend is offline
  }

  return defaultDestinations.map(({ id, name, location, image, rating, description }) => ({
    id,
    name,
    location,
    image,
    rating,
    description,
  }));
}

export async function getDestination(id, signal) {
  const numericId = Number(id);

  try {
    const payload = await getJson(appPath(`/api/destination.php?id=${encodeURIComponent(id)}`), signal);
    if (payload.destination && Array.isArray(payload.attractions)) {
      return payload;
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    // Fall back to default catalog if PHP/MySQL is unavailable
  }

  const fallback = defaultDestinations.find((item) => item.id === numericId) ||
    defaultDestinations.find((item) => item.name.toLowerCase() === String(id).toLowerCase());

  if (fallback) {
    const { attractions, ...destination } = fallback;
    return {
      destination,
      attractions: attractions || [],
    };
  }

  throw new DestinationApiError('Destination details are temporarily unavailable.', 404);
}
