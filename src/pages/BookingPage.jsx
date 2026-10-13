import { useMemo, useState } from 'react';
import { Check, CheckCircle2, Copy, LoaderCircle, MessageCircle, Phone } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { createBooking } from '../features/bookings/api/bookingsApi.js';
import { bookingConfirmationWhatsAppMessage, callUrl, phoneDisplay, whatsappUrl } from '../features/contact/contact.js';

const vehicles = ['Four-seater', 'Family MPV', 'Group traveller'];
const today = new Date().toISOString().slice(0, 10);
const empty = {
  customerName: '',
  phone: '',
  email: '',
  destination: '',
  travelDate: '',
  pickupLocation: '',
  passengers: '',
  vehiclePreference: '',
  returnTrip: false,
  returnDate: '',
  notes: '',
};

function validate(data) {
  const fields = {};
  if (data.customerName.trim().length < 2) fields.customerName = 'Enter your name.';
  if (!/^[0-9+() .-]{7,40}$/.test(data.phone.trim())) fields.phone = 'Enter a valid phone number.';
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) fields.email = 'Enter a valid email address.';
  if (!data.destination.trim()) fields.destination = 'Enter a destination.';
  if (!data.pickupLocation.trim()) fields.pickupLocation = 'Enter a pickup location.';
  if (!data.travelDate || data.travelDate < today) fields.travelDate = 'Choose today or a future date.';
  if (!Number.isInteger(Number(data.passengers)) || Number(data.passengers) < 1 || Number(data.passengers) > 17)
    fields.passengers = 'Enter between 1 and 17 passengers.';
  if (data.returnTrip && (!data.returnDate || data.returnDate < data.travelDate))
    fields.returnDate = 'Choose a return date on or after travel.';
  return fields;
}

export default function BookingPage() {
  const [params] = useSearchParams();
  const initial = useMemo(
    () => ({
      ...empty,
      destination: params.get('destination') || '',
      pickupLocation: params.get('pickup') || '',
      travelDate: params.get('date') || '',
      passengers: params.get('people') || '',
      vehiclePreference: params.get('car') || '',
    }),
    [params]
  );
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState('');
  const [copied, setCopied] = useState(false);

  const set = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      const result = await createBooking(form);
      setReference(result.reference);
    } catch (error) {
      setErrors({ form: error.message, ...error.fields });
    } finally {
      setSubmitting(false);
    }
  }

  function copyReference() {
    if (!reference) return;
    navigator.clipboard?.writeText(reference).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  if (reference) {
    const waText = bookingConfirmationWhatsAppMessage({
      reference,
      customerName: form.customerName,
      trip: form.destination,
      travelDate: form.travelDate,
      pickup: form.pickupLocation,
      passengers: form.passengers,
      vehicle: form.vehiclePreference,
    });

    return (
      <main className="booking-page page-shell">
        <section className="booking-success">
          <div className="success-badge">
            <CheckCircle2 size={46} />
          </div>
          <p className="eyebrow">REQUEST SUBMITTED SUCCESSFULLY</p>
          <h1>Your trip request is on its way.</h1>

          <div className="success-reference-box">
            <div>
              <span className="ref-label">Booking Reference Number</span>
              <span className="ref-code">{reference}</span>
            </div>
            <button className="copy-ref-btn" type="button" onClick={copyReference}>
              {copied ? (
                <>
                  <Check size={16} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy Ref
                </>
              )}
            </button>
          </div>

          <div className="success-trip-summary">
            <div>
              <strong>Travel Route:</strong> {form.pickupLocation} → {form.destination}
            </div>
            <div>
              <strong>Travel Date:</strong> {form.travelDate}
            </div>
            <div>
              <strong>Passengers &amp; Car:</strong> {form.passengers} Guest(s) •{' '}
              {form.vehiclePreference || 'Standard AC vehicle'}
            </div>
          </div>

          <p className="success-help-note">
            We will review your route, driver assignment, and confirm availability shortly. Want an immediate confirmation or
            traveling within 24 hours?
          </p>

          <div className="success-action-buttons">
            <a
              className="button button-whatsapp"
              href={whatsappUrl(waText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> Confirm on WhatsApp Now
            </a>

            <a className="button button-call" href={callUrl()}>
              <Phone size={16} /> Call {phoneDisplay}
            </a>

            <Link className="button button-dark" to="/">
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const input = (field, label, props = {}) => (
    <label className="booking-field">
      <span>
        {label}
        {props.required && <b> Required</b>}
      </span>
      <input
        {...props}
        value={form[field]}
        onChange={(event) => set(field, event.target.value)}
        aria-invalid={Boolean(errors[field])}
        aria-describedby={errors[field] ? `${field}-error` : undefined}
      />
      {errors[field] && <small id={`${field}-error`}>{errors[field]}</small>}
    </label>
  );

  return (
    <main id="main-content" className="booking-page page-shell">
      <div className="booking-intro">
        <p className="eyebrow">BOOK A CAR &amp; DRIVER</p>
        <h1>
          Tell us about
          <br />
          <em>your journey.</em>
        </h1>
        <p>
          Send your trip request and our team will confirm vehicle availability and your final transparent quote.
          No advance payment required until your ride is confirmed.
        </p>

        <div className="booking-assurances">
          <div>✓ Clean &amp; sanitized AC cabs</div>
          <div>✓ Experienced, polite highway drivers</div>
          <div>✓ Transparent per-km billing</div>
          <div>✓ Flexible halts for temple darshan &amp; food</div>
        </div>
      </div>

      <form className="booking-form" onSubmit={submit} noValidate>
        <fieldset>
          <legend>Trip details</legend>
          <div className="booking-grid">
            {input('destination', 'Going to (Destination)', { required: true, placeholder: 'e.g. Dwarka or Somnath' })}
            {input('pickupLocation', 'Pickup location', { required: true, placeholder: 'e.g. Ahmedabad Airport' })}
            {input('travelDate', 'Travel date', { required: true, type: 'date', min: today })}
            {input('passengers', 'Number of passengers', { required: true, type: 'number', min: 1, max: 17, placeholder: '2' })}

            <label className="booking-field">
              <span>Vehicle preference <b>Optional</b></span>
              <select value={form.vehiclePreference} onChange={(event) => set('vehiclePreference', event.target.value)}>
                <option value="">No preference (best suitable car)</option>
                {vehicles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="booking-checkbox">
              <input type="checkbox" checked={form.returnTrip} onChange={(event) => set('returnTrip', event.target.checked)} />
              This is a round trip (Return journey)
            </label>

            {form.returnTrip &&
              input('returnDate', 'Return date', {
                required: true,
                type: 'date',
                min: form.travelDate || today,
              })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact details</legend>
          <div className="booking-grid">
            {input('customerName', 'Your full name', { required: true, autoComplete: 'name', placeholder: 'e.g. Rajesh Patel' })}
            {input('phone', 'Phone / WhatsApp number', { required: true, type: 'tel', autoComplete: 'tel', placeholder: '+91 98250 12345' })}
            {input('email', 'Email address', { type: 'email', autoComplete: 'email', placeholder: 'Optional' })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Trip notes &amp; special requests</legend>
          <label className="booking-field booking-field-wide">
            <span>Anything we should know? <b>Optional</b></span>
            <textarea
              value={form.notes}
              maxLength="2000"
              onChange={(event) => set('notes', event.target.value)}
              placeholder="Number of luggage bags, pickup time preference, flight/train details, or elderly passenger assistance."
            />
          </label>
        </fieldset>

        {errors.form && (
          <p className="form-error" role="alert">
            {errors.form}
          </p>
        )}

        <div className="booking-form-footer">
          <button className="button button-dark booking-submit" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <LoaderCircle className="spin" size={17} /> Sending request…
              </>
            ) : (
              'Send trip request'
            )}
          </button>
          <p className="booking-privacy-note">
            Your details are only used to provide your trip quote and itinerary.
          </p>
        </div>
      </form>
    </main>
  );
}
