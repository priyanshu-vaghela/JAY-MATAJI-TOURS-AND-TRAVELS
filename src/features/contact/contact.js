export const whatsappNumber = '919999999999';
export const phoneDisplay = '+91 99999 99999';

export function whatsappUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function quoteMessage({ pickup = '', destination = '', date = '', people = '', car = '' } = {}) {
  return [
    'Hello Jay Mataji Tours, I would like a quote.',
    `Pick-up: ${pickup || 'Not decided'}.`,
    `Going to: ${destination || 'Not decided'}.`,
    `Date: ${date || 'Not decided'}.`,
    `People: ${people || 'Not decided'}.`,
    `Car: ${car || 'Not decided'}.`,
  ].join(' ');
}
