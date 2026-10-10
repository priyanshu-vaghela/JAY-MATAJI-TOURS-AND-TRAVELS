import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, MapPin, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getDestination } from '../features/destinations/api/destinationsApi.js';
import { quoteMessage, whatsappUrl } from '../features/contact/contact.js';

export default function DestinationDetailPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(0);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError('');
    setErrorStatus(0);
    setDestination(null);
    setAttractions([]);
    getDestination(id, controller.signal)
      .then((result) => {
        setDestination(result.destination);
        setAttractions(result.attractions);
        document.title = `${result.destination.name} | Jay Mataji Tours & Travels`;
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
          setErrorStatus(requestError.status || 0);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id, requestVersion]);

  if (loading) {
    return <main className="detail-state page-shell"><span className="loading-spinner" /><span role="status">Finding the details…</span></main>;
  }

  if (error || !destination) {
    return (
      <main className="detail-state page-shell">
        <p role="alert">{error || 'Destination not found.'}</p>
        {errorStatus !== 404 && <button className="button button-dark" type="button" onClick={() => setRequestVersion((version) => version + 1)}>Try again</button>}
        <Link className="text-link" to="/#destination">Back to destinations</Link>
      </main>
    );
  }

  return (
    <main className="destination-detail">
      <section className="detail-hero" style={{ '--detail-image': `url("${destination.image}")` }}>
        <div className="page-shell detail-hero-content">
          <Link className="detail-back-link" to="/#destination"><ArrowLeft size={15} /> All destinations</Link>
          <p className="eyebrow">{destination.location}</p>
          <h1>{destination.name}</h1>
          <div className="detail-rating"><Star size={15} fill="currentColor" /> {destination.rating}.0 guest favourite</div>
        </div>
      </section>
      <section className="page-shell detail-main">
        <aside className="detail-aside">
          <img src={destination.image} alt={destination.name} />
          <p className="eyebrow">THE QUICK NOTES</p>
          <dl>
            <div><dt>Best time to visit</dt><dd>{destination.best_time}</dd></div>
            <div><dt>Famous for</dt><dd>{destination.famous_for}</dd></div>
            <div><dt>Location</dt><dd><MapPin size={14} /> {destination.location}</dd></div>
          </dl>
          <a className="button button-dark detail-plan-button" href={whatsappUrl(quoteMessage({ destination: destination.name }))}>Get a quote <ArrowUpRight size={16} /></a>
        </aside>
        <article className="detail-story">
          <p className="eyebrow">A PLACE TO REMEMBER</p>
          <h2>Get to know{' '}<br />{' '}<em>{destination.name}.</em></h2>
          <p className="detail-description">{destination.description}</p>
          {attractions.length > 0 && (
            <section className="attractions">
              <h3>Worth the wander</h3>
              <div className="attraction-list">
                {attractions.map((attraction) => (
                  <article className="attraction-item" key={attraction.name}>
                    <span><MapPin size={16} /></span>
                    <div>
                      <h4>{attraction.name}</h4>
                      {attraction.description && <p>{attraction.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </section>
    </main>
  );
}
