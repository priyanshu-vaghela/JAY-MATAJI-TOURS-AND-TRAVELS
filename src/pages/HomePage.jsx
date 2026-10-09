import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Heart, MapPin, MessageCircle, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDestinations } from '../features/destinations/api/destinationsApi.js';
import { quoteMessage, whatsappUrl } from '../features/contact/contact.js';
import { appPath } from '../app/paths.js';

const heroImage = appPath('/assets/optimized/hero.jpg');
const aboutImage = appPath('/assets/about_us/about-banner.png');
const fleet = [
  { name: 'Four-seater', image: appPath('/assets/optimized/swift.jpg'), detail: 'A nimble, comfortable ride for couples and small families.', seats: 'Up to 4 guests', rate: 'From Rs. 12/km' },
  { name: 'Family MPV', image: appPath('/assets/optimized/ertiga.jpg'), detail: 'Room for the whole family, luggage, and a few detours.', seats: 'Up to 7 guests', rate: 'From Rs. 18/km' },
  { name: 'Group traveller', image: appPath('/assets/choose_ride/urbania.jpg'), detail: 'An easygoing way to keep a big group together on the road.', seats: 'Up to 17 guests', rate: 'From Rs. 28/km' },
];

function DestinationGrid({ destinations, isLoading, error, onRetry }) {
  if (isLoading) return <div className="destination-message" role="status"><span className="loading-spinner" />Finding your next favourite place…</div>;
  if (error) return <div className="destination-message destination-message-error" role="alert"><p>{error}</p><button className="text-button" type="button" onClick={onRetry}>Try again</button></div>;
  if (destinations.length === 0) return <div className="destination-message">No destinations are available right now.</div>;
  return <div className="destination-grid">{destinations.map((destination, index) => <article className={`destination-card${index === 0 ? ' destination-card-featured' : ''}`} key={destination.id}><Link className="destination-image-link" to={`/destinations/${destination.id}`} aria-label={`Discover ${destination.name}`}><img className="destination-image" src={destination.image} alt={destination.name} loading="lazy" /><span className="destination-open"><ArrowUpRight size={20} /></span></Link><div className="destination-card-content"><div className="destination-meta"><span><MapPin size={13} /> {destination.location}</span><span className="rating"><Star size={13} fill="currentColor" /> {destination.rating}.0</span></div><h3><Link to={`/destinations/${destination.id}`}>{destination.name}</Link></h3><p>{destination.description}</p><Link className="destination-link" to={`/destinations/${destination.id}`}>Get to know the place <ArrowRight size={15} /></Link></div></article>)}</div>;
}

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestVersion, setRequestVersion] = useState(0);
  const [enquiry, setEnquiry] = useState({ pickup: '', destination: '', date: '', people: '', car: '' });

  useEffect(() => {
    const controller = new AbortController();
    getDestinations(controller.signal).then((items) => { setDestinations(items); setError(''); }).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [requestVersion]);

  function updateEnquiry(field, value) { setEnquiry((current) => ({ ...current, [field]: value })); }
  function handleEnquiry(event) { event.preventDefault(); window.location.assign(whatsappUrl(quoteMessage(enquiry))); }

  return <main>
    <section className="hero" id="home" style={{ '--hero-image': `url("${heroImage}")` }}><div className="page-shell hero-inner"><p className="eyebrow hero-eyebrow"><span /> JAY MATAJI TOURS &amp; TRAVELS</p><h1>Car and driver<br />across <em>Gujarat.</em></h1><p className="hero-copy">Tell us where you want to go and we will send you a price today.</p><div className="hero-actions"><a className="button button-accent" href="#plan-trip">Get a quote on WhatsApp <MessageCircle size={17} /></a><a className="hero-secondary-link" href="#destination">Discover the places <ArrowDown size={15} /></a></div><div className="hero-caption"><span>Reliable local travel</span><span>THE ROAD IS YOURS</span></div></div><div className="hero-stamp" aria-hidden="true"><span>EXPLORE</span><Compass size={27} strokeWidth={1.2} /><span>GUJARAT</span></div></section>
    <section className="planner-wrap" id="plan-trip"><div className="planner page-shell"><div className="planner-heading"><span className="planner-icon"><MessageCircle size={18} /></span><span><strong>Get a travel quote</strong><small>We will reply on WhatsApp</small></span></div><form className="planner-form" onSubmit={handleEnquiry}><label className="planner-input"><span>PICK-UP PLACE</span><input value={enquiry.pickup} onChange={(event) => updateEnquiry('pickup', event.target.value)} placeholder="e.g. Ahmedabad" required /></label><label className="planner-input"><span>GOING TO</span><input value={enquiry.destination} onChange={(event) => updateEnquiry('destination', event.target.value)} placeholder="e.g. Dwarka" required /></label><label className="planner-input"><span>DATE</span><input type="date" value={enquiry.date} onChange={(event) => updateEnquiry('date', event.target.value)} required /></label><label className="planner-input"><span>PEOPLE</span><input type="number" min="1" value={enquiry.people} onChange={(event) => updateEnquiry('people', event.target.value)} placeholder="2" required /></label><label className="planner-input"><span>CAR TYPE</span><select value={enquiry.car} onChange={(event) => updateEnquiry('car', event.target.value)} required><option value="">Choose a car</option>{fleet.map((vehicle) => <option key={vehicle.name} value={vehicle.name}>{vehicle.name}</option>)}</select></label><button className="button button-dark" type="submit">Send on WhatsApp <ArrowUpRight size={16} /></button></form></div></section>
    <section className="section destinations-section" id="destination"><div className="page-shell"><div className="section-heading"><div><p className="eyebrow">PLACES WITH A STORY</p><h2>A little closer<br />to <em>somewhere.</em></h2></div><p className="section-intro">Ancient shorelines, sun-soaked cities, and roads that lead somewhere beautiful. These are a few of our favourite starting points.</p></div><DestinationGrid destinations={destinations} isLoading={loading} error={error} onRetry={() => { setLoading(true); setRequestVersion((version) => version + 1); }} /></div></section>
    <section className="story-section" id="about_us"><div className="page-shell story-grid"><div className="story-image-wrap"><img src={aboutImage} alt="The landscape waiting beyond the next turn" loading="lazy" /><div className="story-note"><Heart size={17} /> Travel a little more personally.</div></div><div className="story-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>More than a trip.<br /><em>A feeling that stays.</em></h2><p className="story-body">Jay Mataji Tours &amp; Travels brings local know-how, dependable rides, and the little details together—so you can be right where you want to be.</p><div className="story-points"><div><span><Compass size={18} /></span><p><strong>Know the way</strong><small>Local insight for memorable routes.</small></p></div><div><span><ShieldCheck size={18} /></span><p><strong>Ride with ease</strong><small>Thoughtful planning, trusted drivers.</small></p></div><div><span><Sparkles size={18} /></span><p><strong>Make it yours</strong><small>Journeys shaped around your pace.</small></p></div></div><a className="text-link" href="#choose-your-ride">Find your way around <ArrowRight size={15} /></a></div></div></section>
    <section className="section fleet-section" id="choose-your-ride"><div className="page-shell"><div className="section-heading fleet-heading"><div><p className="eyebrow">ROOM FOR THE WHOLE JOURNEY</p><h2>Good company.<br /><em>Better wheels.</em></h2></div><p className="section-intro">Pick the ride that suits your crew. Every kilometre is a chance to take the scenic route.</p></div><div className="fleet-grid">{fleet.map((vehicle) => <article className="fleet-card" key={vehicle.name}><div className="fleet-image"><img src={vehicle.image} alt={vehicle.name} loading="lazy" /></div><div className="fleet-card-body"><div className="fleet-card-meta"><span>{vehicle.seats}</span><span>{vehicle.rate}</span></div><h3>{vehicle.name}</h3><p>{vehicle.detail}</p><p className="fleet-rate-note">Driver included. Fuel and tolls are extra.</p><a href={whatsappUrl(quoteMessage({ car: vehicle.name }))} aria-label={`Get a quote for the ${vehicle.name}`}>Get a quote for this car <ArrowUpRight size={16} /></a></div></article>)}</div></div></section>
  </main>;
}
