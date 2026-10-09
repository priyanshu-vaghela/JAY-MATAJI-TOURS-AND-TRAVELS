import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Heart, MapPin, Search, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDestinations } from '../api.js';
import { appPath } from '../paths.js';

const heroImage = appPath('/assets/hero-section/pexels-mukund-patel-1264723-2409361.jpg');
const aboutImage = appPath('/assets/about_us/about-banner.png');

const fleet = [
  {
    name: 'Four-seater',
    image: appPath('/assets/choose_ride/Suzuki_Swift.jpg'),
    detail: 'A nimble, comfortable ride for couples and small families.',
    seats: 'Up to 4 guests',
    rate: 'From ₹12/km',
  },
  {
    name: 'Family MPV',
    image: appPath('/assets/choose_ride/Suzuki_Ertiga.jpg'),
    detail: 'Room for the whole family, the luggage, and a few detours.',
    seats: 'Up to 7 guests',
    rate: 'From ₹18/km',
  },
  {
    name: 'Group traveller',
    image: appPath('/assets/choose_ride/urbania.jpg'),
    detail: 'An easygoing way to keep a big group together on the road.',
    seats: 'Up to 17 guests',
    rate: 'From ₹28/km',
  },
];

function DestinationGrid({ destinations, isLoading, error, searchTerm, onRetry }) {
  if (isLoading) {
    return (
      <div className="destination-message" role="status">
        <span className="loading-spinner" />
        <span>Finding your next favourite place…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="destination-message destination-message-error" role="alert">
        <p>{error}</p>
        <button className="text-button" type="button" onClick={onRetry}>Try again</button>
      </div>
    );
  }

  if (destinations.length === 0 && searchTerm) {
    return (
      <div className="destination-message">
        <p>No places match “{searchTerm}”. Try a different destination.</p>
      </div>
    );
  }

  if (destinations.length === 0) {
    return <div className="destination-message">No destinations are available right now.</div>;
  }

  return (
    <div className="destination-grid">
      {destinations.map((destination, index) => (
        <article className={`destination-card${index === 0 ? ' destination-card-featured' : ''}`} key={destination.id}>
          <Link className="destination-image-link" to={`/destinations/${destination.id}`} aria-label={`Discover ${destination.name}`}>
            <img className="destination-image" src={destination.image} alt={destination.name} loading="lazy" />
            <span className="destination-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="destination-open"><ArrowUpRight size={20} /></span>
          </Link>
          <div className="destination-card-content">
            <div className="destination-meta">
              <span><MapPin size={13} /> {destination.location}</span>
              <span className="rating"><Star size={13} fill="currentColor" /> {destination.rating}.0</span>
            </div>
            <h3><Link to={`/destinations/${destination.id}`}>{destination.name}</Link></h3>
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
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [draftSearch, setDraftSearch] = useState('');
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getDestinations(controller.signal)
      .then((items) => {
        setDestinations(items);
        setError('');
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [requestVersion]);

  const visibleDestinations = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();

    if (!query) {
      return destinations;
    }

    return destinations.filter(({ name, location }) =>
      `${name || ''} ${location || ''}`.toLocaleLowerCase().includes(query),
    );
  }, [destinations, searchTerm]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(draftSearch);
    document.getElementById('destination')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main>
      <section
        className="hero"
        id="home"
        style={{ '--hero-image': `url("${heroImage}")` }}
      >
        <div className="page-shell hero-inner">
          <p className="eyebrow hero-eyebrow"><span /> GOOD JOURNEYS START HERE</p>
          <h1>Find your way{' '}<br />to{' '}<em>wonder.</em></h1>
          <p className="hero-copy">
            India has a thousand ways to surprise you. We’ll help you find the one that feels like yours.
          </p>
          <div className="hero-actions">
            <a className="button button-accent" href="#plan-trip">Plan your journey <ArrowUpRight size={17} /></a>
            <a className="hero-secondary-link" href="#destination">Discover the places <ArrowDown size={15} /></a>
          </div>
          <div className="hero-caption"><span>01 / 03</span><span>THE ROAD IS YOURS</span></div>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>EXPLORE</span>
          <Compass size={27} strokeWidth={1.2} />
          <span>INDIA</span>
        </div>
      </section>

      <section className="planner-wrap" id="plan-trip">
        <div className="planner page-shell">
          <div className="planner-heading">
            <span className="planner-icon"><Search size={18} /></span>
            <span>
              <strong>Where to next?</strong>
              <small>Start with a place that calls to you</small>
            </span>
          </div>
          <form className="planner-form" onSubmit={handleSearch}>
            <label className="planner-input">
              <span>YOUR NEXT STOP</span>
              <input
                type="search"
                value={draftSearch}
                onChange={(event) => setDraftSearch(event.target.value)}
                placeholder="Try Dwarka or Goa"
              />
            </label>
            <button className="button button-dark" type="submit">
              Explore places <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="section destinations-section" id="destination">
        <div className="page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PLACES WITH A STORY</p>
              <h2>A little closer{' '}<br />to{' '}<em>somewhere.</em></h2>
            </div>
            <p className="section-intro">
              Ancient shorelines, sun-soaked cities, and roads that lead somewhere beautiful. These are a few of our favourite starting points.
            </p>
          </div>
          {searchTerm && (
            <div className="search-feedback">
              <span>Showing {visibleDestinations.length} {visibleDestinations.length === 1 ? 'place' : 'places'} for “{searchTerm}”</span>
              <button type="button" onClick={() => { setSearchTerm(''); setDraftSearch(''); }}>Clear search</button>
            </div>
          )}
          <DestinationGrid
            destinations={visibleDestinations}
            isLoading={loading}
            error={error}
            searchTerm={searchTerm}
            onRetry={() => { setLoading(true); setRequestVersion((version) => version + 1); }}
          />
        </div>
      </section>

      <section className="story-section" id="about_us">
        <div className="page-shell story-grid">
          <div className="story-image-wrap">
            <img src={aboutImage} alt="The landscape waiting beyond the next turn" loading="lazy" />
            <div className="story-note"><Heart size={17} /> Travel a little more personally.</div>
          </div>
          <div className="story-copy">
            <p className="eyebrow">A LITTLE ABOUT US</p>
            <h2>More than a trip.{' '}<br />{' '}<em>A feeling that stays.</em></h2>
            <p className="story-body">
              We believe the best trips leave room for the unexpected. Jay Mataji Tours &amp; Travels brings local know-how, dependable rides, and the little details together—so you can be right where you want to be.
            </p>
            <div className="story-points">
              <div><span><Compass size={18} /></span><p><strong>Know the way</strong><small>Local insight for memorable routes.</small></p></div>
              <div><span><ShieldCheck size={18} /></span><p><strong>Ride with ease</strong><small>Thoughtful planning, trusted drivers.</small></p></div>
              <div><span><Sparkles size={18} /></span><p><strong>Make it yours</strong><small>Journeys shaped around your pace.</small></p></div>
            </div>
            <a className="text-link" href="#choose-your-ride">Find your way around <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section fleet-section" id="choose-your-ride">
        <div className="page-shell">
          <div className="section-heading fleet-heading">
            <div>
              <p className="eyebrow">ROOM FOR THE WHOLE JOURNEY</p>
              <h2>Good company.{' '}<br />{' '}<em>Better wheels.</em></h2>
            </div>
            <p className="section-intro">
              Pick the ride that suits your crew. Every kilometre is a chance to take the scenic route.
            </p>
          </div>
          <div className="fleet-grid">
            {fleet.map((vehicle) => (
              <article className="fleet-card" key={vehicle.name}>
                <div className="fleet-image"><img src={vehicle.image} alt={vehicle.name} loading="lazy" /></div>
                <div className="fleet-card-body">
                  <div className="fleet-card-meta"><span>{vehicle.seats}</span><span>{vehicle.rate}</span></div>
                  <h3>{vehicle.name}</h3>
                  <p>{vehicle.detail}</p>
                  <a href="#plan-trip" aria-label={`Plan a trip in the ${vehicle.name}`}>
                    Explore your options <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
