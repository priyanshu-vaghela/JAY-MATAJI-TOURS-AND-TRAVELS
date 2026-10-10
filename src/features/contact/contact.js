export const whatsappNumber = '919999999999';
export const phoneDisplay = '+91 99999 99999';

export function whatsappUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function quoteMessage({ pickup = '', destination = '', date = '', people = '', car = '' } = {}) {
  const clean = (value) => String(value).trim();

  return [
    'Hello Jay Mataji Tours, I would like a quote.',
    `Pick-up: ${clean(pickup) || 'Not decided'}.`,
    `Going to: ${clean(destination) || 'Not decided'}.`,
    `Date: ${clean(date) || 'Not decided'}.`,
    `People: ${clean(people) || 'Not decided'}.`,
    `Car: ${clean(car) || 'Not decided'}.`,
  ].join(' ');
}
