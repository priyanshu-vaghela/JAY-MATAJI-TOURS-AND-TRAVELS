export const whatsappNumber =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER) || '919825123456';

export const phoneDisplay =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PHONE_DISPLAY) || '+91 98251 23456';

export const companyEmail =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_COMPANY_EMAIL) || 'jaymatajitoursgujarat@gmail.com';

export const officeLocation = 'Ahmedabad & Rajkot, Gujarat, India';

export function callUrl() {
  return `tel:+${whatsappNumber.replace(/\D/g, '')}`;
}

export function whatsappUrl(message = '') {
  const cleanNum = whatsappNumber.replace(/\D/g, '');
  const encoded = encodeURIComponent(message || 'Hello Jay Mataji Tours & Travels, I would like to inquire about car and driver rental.');
  return `https://wa.me/${cleanNum}?text=${encoded}`;
}

export function quoteMessage({ pickup = '', destination = '', date = '', people = '', car = '' } = {}) {
  const clean = (value) => String(value).trim();

  return [
    'Hello Jay Mataji Tours & Travels! I would like to enquire about a trip quote.',
    `Pick-up: ${clean(pickup) || 'Not decided'}`,
    `Going to: ${clean(destination) || 'Not decided'}`,
    `Date: ${clean(date) || 'Not decided'}`,
    `Passengers: ${clean(people) || 'Not decided'}`,
    `Vehicle: ${clean(car) || 'No preference'}`,
    'Please share availability and pricing details. Thank you!'
  ].join('\n');
}

export function bookingConfirmationWhatsAppMessage({ reference, customerName, trip, travelDate, pickup, passengers, vehicle }) {
  return [
    'Hello Jay Mataji Tours & Travels!',
    `I have submitted a booking request.`,
    `*Booking Reference:* ${reference}`,
    `*Customer Name:* ${customerName}`,
    `*Trip:* ${trip}`,
    `*Pickup:* ${pickup}`,
    `*Travel Date:* ${travelDate}`,
    `*Passengers:* ${passengers}`,
    vehicle ? `*Preferred Vehicle:* ${vehicle}` : '',
    'Please confirm vehicle availability and final quote. Thank you!'
  ].filter(Boolean).join('\n');
}
