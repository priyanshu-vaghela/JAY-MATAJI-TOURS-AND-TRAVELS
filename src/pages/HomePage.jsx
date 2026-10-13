import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getDestinations } from '../features/destinations/api/destinationsApi.js';
import { appPath } from '../app/paths.js';
import { callUrl, phoneDisplay, quoteMessage, whatsappUrl } from '../features/contact/contact.js';

const heroImage = appPath('/assets/optimized/hero.jpg');
const aboutImage = appPath('/assets/about_us/about-banner.png');

const fleet = [
  {
    name: 'Four-seater (Swift / Dzire)',
    image: appPath('/assets/optimized/swift.jpg'),
    detail: 'Ideal for couples, solo travelers, and small families. Nimble on busy city streets and smooth on highways.',
    seats: 'Up to 4 guests',
    luggage: '2 Medium Bags',
    maxPeople: 4,
    rate: 'From Rs. 12/km',
    features: ['Chilled AC', 'Bluetooth / AUX Audio', 'Comfortable Sedans'],
  },
  {
    name: 'Family MPV (Ertiga / Carens)',
    image: appPath('/assets/optimized/ertiga.jpg'),
    detail: 'Generous legroom, spacious boot, and rear AC vents. The favorite choice for multi-day pilgrimage and family tours.',
    seats: 'Up to 7 guests',
    luggage: '4 Large Bags',
    maxPeople: 7,
    rate: 'From Rs. 18/km',
    features: ['Rear AC Vents', 'Ample Luggage Boot', 'Reclining Middle Seats'],
  },
  {
    name: 'Group Traveller (Urbania / Tempo)',
    image: appPath('/assets/choose_ride/urbania.jpg'),
    detail: 'Keep the entire group together without cramping. High roof, individual pushback seats, and panoramic touring windows.',
    seats: 'Up to 17 guests',
    luggage: '10+ Bags',
    maxPeople: 17,
    rate: 'From Rs. 28/km',
    features: ['Pushback Seats', 'High Ceiling Walkthrough', 'Dual AC Cooling'],
  },
];

const trustPillars = [
  {
    icon: ShieldCheck,
    title: 'Verified & Courteous Drivers',
    text: 'Every driver is background-checked, polite, non-smoking on duty, and intimately familiar with Gujarat highways and temple timings.',
  },
  {
    icon: Award,
    title: 'Transparent Per-KM Billing',
    text: 'No surprise fuel surcharges or hidden fees. We provide crystal-clear quotes with complete breakdown before your trip begins.',
  },
  {
    icon: Sparkles,
    title: 'Sanitized & Serviced Fleet',
    text: 'All vehicles undergo routine mechanical safety checks, tyre inspections, and thorough interior sanitization prior to every departure.',
  },
  {
    icon: Clock,
    title: '24/7 Helpline & Darshan Flexibility',
    text: 'Travel on your own schedule. Stop for tea, breakfast, scenic photos, or extended temple prayers without rush.',
  },
];

const testimonials = [
  {
    name: 'Rajesh & Meena Patel',
    city: 'Ahmedabad',
    trip: 'Dwarka & Somnath (4 Days)',
    vehicle: 'Ertiga MPV',
    rating: 5,
    quote:
      'We booked the Ertiga for a 4-day pilgrimage with my elderly parents. Our driver Ramesh was exceptionally respectful, drove safely within speed limits, and knew all the temple darshan timings. Highly recommended!',
  },
  {
    name: 'Sneha Sharma & Family',
    city: 'Mumbai',
    trip: 'Ahmedabad to Statue of Unity',
    vehicle: 'Swift Dzire',
    rating: 5,
    quote:
      'Punctual 6:00 AM pickup right at our hotel doorstep. The car was spotless, AC was great, and the driver showed us wonderful local Kathiyawadi dining spots on the way.',
  },
  {
    name: 'Dr. Amit Varma',
    city: 'New Delhi',
    trip: 'Gujarat to Rajasthan Circuit (7 Days)',
    vehicle: 'Force Urbania',
    rating: 5,
    quote:
      'We had a group of 14 people for a family wedding and vacation. The Urbania was super comfortable with pushback seats. The Jay Mataji team handled route planning and coordination seamlessly.',
  },
];

const faqs = [
  {
    q: 'How is the total fare calculated for outstation trips?',
    a: 'Outstation trips are billed based on total kilometers traveled subject to a standard minimum daily average (usually 250–300 km/day depending on the route). Driver night allowance applies for overnight stays. We provide a complete itemized estimate prior to booking.',
  },
  {
    q: 'Are tolls, state border permits, and parking included in the price?',
    a: 'Toll taxes, parking fees, and interstate permits are typically paid at actual receipts during the journey, or we can provide an all-inclusive fixed package quote upon request.',
  },
  {
    q: 'How do I confirm my booking and when do I pay?',
    a: 'You can submit an online request or message us on WhatsApp. Once availability is confirmed, you only need to pay a nominal token advance, with the balance payable directly to the driver during your journey.',
  },
  {
    q: 'Can we customize our stops and itinerary along the way?',
    a: 'Yes! Since this is a private cab dedicated exclusively to your group, you have full freedom to take breaks, explore roadside attractions, and adjust temple visit timings at your own pace.',
  },
  {
    q: 'What if our train or flight arrives late?',
    a: 'Our drivers monitor schedule updates. Simply notify us via WhatsApp or phone call and we will hold your pickup with zero hassle.',
  },
];

function todayInLocalTime() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function DestinationGrid({ destinations, isLoading, error, onRetry }) {
  if (isLoading)
    return (
      <div className="destination-message" role="status">
        <span className="loading-spinner" /> Finding your next favourite place…
      </div>
    );
  if (error)
    return (
      <div className="destination-message destination-message-error" role="alert">
        <p>{error}</p>
        <button className="text-button" type="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  if (destinations.length === 0) return <div className="destination-message">No destinations are available right now.</div>;

  return (
    <div className="destination-grid">
      {destinations.map((destination, index) => (
        <article className={`destination-card${index === 0 ? ' destination-card-featured' : ''}`} key={destination.id}>
          <Link className="destination-image-link" to={`/destinations/${destination.id}`} aria-label={`Discover ${destination.name}`}>
            <img className="destination-image" src={destination.image} alt={destination.name} loading="lazy" />
            <span className="destination-open">
              <ArrowUpRight size={20} />
            </span>
          </Link>
          <div className="destination-card-content">
            <div className="destination-meta">
              <span>
                <MapPin size={13} /> {destination.location}
              </span>
              <span className="rating">
                <Star size={13} fill="currentColor" /> {destination.rating}.0
              </span>
            </div>
            <h3>
              <Link to={`/destinations/${destination.id}`}>{destination.name}</Link>
            </h3>
            <p>{destination.description}</p>
            <Link className="destination-link" to={`/destinations/${destination.id}`}>
              Get to know the place <ArrowRight size={15} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestVersion, setRequestVersion] = useState(0);
  const [enquiry, setEnquiry] = useState({ pickup: '', destination: '', date: '', people: '', car: '' });
  const [enquiryError, setEnquiryError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const selectedVehicle = fleet.find((vehicle) => vehicle.name === enquiry.car);
  const maxPeople = selectedVehicle?.maxPeople || 17;

  useEffect(() => {
    const controller = new AbortController();
    getDestinations(controller.signal)
      .then((items) => {
        setDestinations(items);
        setError('');
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [requestVersion]);

  function updateEnquiry(field, value) {
    setEnquiryError('');
    setEnquiry((current) => ({ ...current, [field]: value }));
  }

  function handleEnquiry(event) {
    event.preventDefault();
    const cleanedEnquiry = { ...enquiry, pickup: enquiry.pickup.trim(), destination: enquiry.destination.trim() };
    const people = Number(cleanedEnquiry.people);

    if (!cleanedEnquiry.pickup || !cleanedEnquiry.destination) {
      setEnquiryError('Please enter both a pick-up place and destination.');
      return;
    }
    if (!cleanedEnquiry.date) {
      setEnquiryError('Please choose a travel date.');
      return;
    }
    if (cleanedEnquiry.date < todayInLocalTime()) {
      setEnquiryError('Please choose today or a future travel date.');
      return;
    }
    if (!selectedVehicle) {
      setEnquiryError('Please choose a car type.');
      return;
    }
    if (!Number.isInteger(people) || people < 1) {
      setEnquiryError('Enter how many people.');
      return;
    }
    if (people > maxPeople) {
      setEnquiryError(`The selected car can carry up to ${maxPeople} people.`);
      return;
    }

    const query = new URLSearchParams({
      pickup: cleanedEnquiry.pickup,
      destination: cleanedEnquiry.destination,
      date: cleanedEnquiry.date,
      people: cleanedEnquiry.people,
      car: cleanedEnquiry.car,
    });
    navigate(`/book?${query.toString()}`);
  }

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="hero" id="home" style={{ '--hero-image': `url("${heroImage}")` }}>
        <div className="page-shell hero-inner">
          <p className="eyebrow hero-eyebrow">
            <span /> JAY MATAJI TOURS &amp; TRAVELS
          </p>
          <h1>
            Car and driver
            <br />
            across <em>Gujarat.</em>
          </h1>
          <p className="hero-copy">
            Dependable chauffeur-driven vehicles for pilgrimage, outstation tours, and family holidays. Tell us where you want to go and we’ll confirm availability.
          </p>
          <div className="hero-actions">
            <a className="button button-accent" href="#plan-trip">
              Plan your trip <MessageCircle size={17} />
            </a>
            <a className="button button-ghost-light" href={callUrl()}>
              <Phone size={15} /> Call {phoneDisplay}
            </a>
            <a className="hero-secondary-link" href="#destination">
              Discover destinations <ArrowDown size={15} />
            </a>
          </div>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>EXPLORE</span>
          <Compass size={27} strokeWidth={1.2} />
          <span>GUJARAT</span>
        </div>
      </section>

      {/* Trip Planner */}
      <section className="planner-wrap" id="plan-trip">
        <div className="planner page-shell">
          <div className="planner-heading">
            <span className="planner-icon">
              <MessageCircle size={18} />
            </span>
            <span>
              <strong>Start a trip request</strong>
              <small>Instant availability &amp; transparent quotes</small>
            </span>
          </div>

          <form className="planner-form" onSubmit={handleEnquiry} noValidate>
            <label className="planner-input">
              <span>PICK-UP PLACE</span>
              <input
                value={enquiry.pickup}
                onChange={(event) => updateEnquiry('pickup', event.target.value)}
                placeholder="e.g. Ahmedabad"
                aria-describedby="enquiry-error"
                required
              />
            </label>

            <label className="planner-input">
              <span>GOING TO</span>
              <input
                value={enquiry.destination}
                onChange={(event) => updateEnquiry('destination', event.target.value)}
                placeholder="e.g. Dwarka"
                aria-describedby="enquiry-error"
                required
              />
            </label>

            <label className="planner-input">
              <span>DATE</span>
              <input
                type="date"
                min={todayInLocalTime()}
                value={enquiry.date}
                onChange={(event) => updateEnquiry('date', event.target.value)}
                aria-describedby="enquiry-error"
                required
              />
            </label>

            <label className="planner-input">
              <span>PEOPLE</span>
              <input
                type="number"
                min="1"
                max={maxPeople}
                step="1"
                value={enquiry.people}
                onChange={(event) => updateEnquiry('people', event.target.value)}
                placeholder="2"
                aria-describedby="enquiry-error"
                required
              />
            </label>

            <label className="planner-input">
              <span>CAR TYPE</span>
              <select
                value={enquiry.car}
                onChange={(event) => updateEnquiry('car', event.target.value)}
                aria-describedby="enquiry-error"
                required
              >
                <option value="">Choose a car</option>
                {fleet.map((vehicle) => (
                  <option key={vehicle.name} value={vehicle.name}>
                    {vehicle.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="planner-buttons">
              <button className="button button-dark" type="submit">
                Continue booking <ArrowUpRight size={16} />
              </button>
              <a
                className="button button-whatsapp-sm"
                href={whatsappUrl(quoteMessage(enquiry))}
                target="_blank"
                rel="noopener noreferrer"
                title="Send inquiry on WhatsApp"
              >
                <MessageCircle size={15} /> WhatsApp Quote
              </a>
            </div>

            {enquiryError && (
              <p className="planner-error" id="enquiry-error" role="alert">
                {enquiryError}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section destinations-section" id="destination">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">POPULAR CIRCUITS &amp; PILGRIMAGE</p>
              <h2>
                A little closer
                <br />
                to <em>somewhere.</em>
              </h2>
            </div>
            <p className="section-intro">
              Sacred coastal temples, historic royal fortresses, and panoramic landscapes. Discover our most popular outstation routes across Gujarat and India.
            </p>
          </div>
          <DestinationGrid
            destinations={destinations}
            isLoading={loading}
            error={error}
            onRetry={() => {
              setLoading(true);
              setRequestVersion((version) => version + 1);
            }}
          />
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="section fleet-section" id="choose-your-ride">
        <div className="page-shell">
          <div className="section-heading fleet-heading">
            <div>
              <p className="eyebrow">ROOM FOR THE WHOLE JOURNEY</p>
              <h2>
                Good company.
                <br />
                <em>Better wheels.</em>
              </h2>
            </div>
            <p className="section-intro">
              From comfortable sedans for couples to large group coaches for family pilgrimages. All rides come with verified highway drivers and sanitized AC interiors.
            </p>
          </div>

          <div className="fleet-grid">
            {fleet.map((vehicle) => (
              <article className="fleet-card" key={vehicle.name}>
                <div className="fleet-image">
                  <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                </div>
                <div className="fleet-card-body">
                  <div className="fleet-card-meta">
                    <span>
                      <Users size={12} /> {vehicle.seats}
                    </span>
                    <strong className="fleet-rate-badge">{vehicle.rate}</strong>
                  </div>
                  <h3>{vehicle.name}</h3>
                  <p>{vehicle.detail}</p>
                  <ul className="fleet-features-list">
                    {vehicle.features.map((feat) => (
                      <li key={feat}>
                        <CheckCircle2 size={13} /> {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="fleet-card-actions">
                    <Link className="button button-dark fleet-book-btn" to={`/book?car=${encodeURIComponent(vehicle.name)}`}>
                      Plan with this car <ArrowUpRight size={15} />
                    </Link>
                    <a
                      className="fleet-wa-link"
                      href={whatsappUrl(`Hello Jay Mataji Tours, I want to inquire about booking the ${vehicle.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={15} /> WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-us-section" id="why-us">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE JAY MATAJI PROMISE</p>
              <h2>
                Travel with peace
                <br />
                of <em>mind.</em>
              </h2>
            </div>
            <p className="section-intro">
              Over a decade of trusted travel experience across Saurashtra, Kutch, and North Gujarat. Here is why thousands of pilgrims and tourists choose us.
            </p>
          </div>

          <div className="why-us-grid">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article className="why-us-card" key={pillar.title}>
                  <div className="why-us-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story / About Section */}
      <section className="story-section" id="about_us">
        <div className="page-shell story-grid">
          <div className="story-image-wrap">
            <img src={aboutImage} alt="Three travelers setting off with their luggage" loading="lazy" />
            <div className="story-note">
              <Heart size={17} /> Travel a little more personally.
            </div>
          </div>
          <div className="story-copy">
            <p className="eyebrow">A LITTLE ABOUT US</p>
            <h2>
              More than a trip.
              <br />
              <em>A feeling that stays.</em>
            </h2>
            <p className="story-body">
              Jay Mataji Tours &amp; Travels brings local know-how, dependable rides, and thoughtful hospitality together.
              Whether it’s early morning temple darshan at Somnath, tranquil sunsets at Shivrajpur Beach, or a multi-day family wedding tour,
              our drivers treat your journey as their own.
            </p>
            <div className="story-points">
              <div>
                <span>
                  <Compass size={18} />
                </span>
                <p>
                  <strong>Know the way</strong>
                  <small>Local insight for memorable routes, temple darshan timings, and dining.</small>
                </p>
              </div>
              <div>
                <span>
                  <ShieldCheck size={18} />
                </span>
                <p>
                  <strong>Ride with ease</strong>
                  <small>Thoughtful planning, experienced highway drivers, and sanitized cabs.</small>
                </p>
              </div>
              <div>
                <span>
                  <Sparkles size={18} />
                </span>
                <p>
                  <strong>Make it yours</strong>
                  <small>Private vehicle rentals shaped completely around your pace.</small>
                </p>
              </div>
            </div>
            <a className="text-link" href="#plan-trip">
              Start planning your journey <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Guest Reviews / Testimonials */}
      <section className="section reviews-section" id="reviews">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GUEST EXPERIENCES</p>
              <h2>
                Stories from the
                <br />
                <em>open road.</em>
              </h2>
            </div>
            <p className="section-intro">
              Hear directly from travelers, families, and pilgrims who explored Gujarat with our drivers.
            </p>
          </div>

          <div className="reviews-grid">
            {testimonials.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="review-quote">“{review.quote}”</blockquote>
                <div className="review-author">
                  <strong>{review.name}</strong>
                  <span>
                    {review.city} • {review.trip}
                  </span>
                  <small className="review-vehicle-tag">{review.vehicle}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section faq-section" id="faq">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CLEAR ANSWERS</p>
              <h2>
                Frequently asked
                <br />
                <em>questions.</em>
              </h2>
            </div>
            <p className="section-intro">
              Everything you need to know about booking, fare calculation, and on-trip amenities.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={faq.q}>
                  <button
                    className="faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  {isOpen && <div className="faq-answer"><p>{faq.a}</p></div>}
                </div>
              );
            })}
          </div>

          <div className="faq-cta-box">
            <p>Still have questions? Our travel team is available 24/7 on call and WhatsApp.</p>
            <div className="faq-cta-actions">
              <a className="button button-dark" href={callUrl()}>
                <Phone size={15} /> Call {phoneDisplay}
              </a>
              <a
                className="button button-whatsapp"
                href={whatsappUrl('Hello Jay Mataji Tours, I have a few questions regarding outstation cab booking.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
