import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { appPath } from '../../app/paths.js';
import { callUrl, companyEmail, officeLocation, phoneDisplay, whatsappUrl } from '../../features/contact/contact.js';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/" aria-label="Jay Mataji Tours and Travels home">
            <img src={appPath('/assets/brand-wordmark-light.svg')} alt="Jay Mataji Tours & Travels" />
          </Link>
          <p>
            Dependable car and driver rentals across Gujarat and India. Dedicated pilgrimage packages, family vacations,
            and corporate travel with transparent per-km billing and verified highway drivers.
          </p>
          <div className="footer-direct-contact">
            <a href={callUrl()} className="footer-contact-item">
              <Phone size={14} /> {phoneDisplay}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="footer-contact-item footer-wa-item">
              <MessageCircle size={14} /> WhatsApp Support
            </a>
            <a href={`mailto:${companyEmail}`} className="footer-contact-item">
              <Mail size={14} /> {companyEmail}
            </a>
            <span className="footer-contact-item">
              <MapPin size={14} /> {officeLocation}
            </span>
          </div>
        </div>

        <div className="footer-links">
          <p className="eyebrow">Discover</p>
          <a href={appPath('/#destination')}>Popular Destinations</a>
          <a href={appPath('/#choose-your-ride')}>Our Fleet &amp; Pricing</a>
          <a href={appPath('/#why-us')}>Why Choose Us</a>
          <a href={appPath('/#reviews')}>Guest Testimonials</a>
          <a href={appPath('/#faq')}>Frequently Asked Questions</a>
          <a href={appPath('/#about_us')}>About Jay Mataji</a>
        </div>

        <div className="footer-action-block">
          <a className="footer-cta" href={appPath('/#plan-trip')}>
            <span>
              Ready when you are.
              <small>Let’s make it a journey to remember.</small>
            </span>
            <ArrowUpRight size={22} />
          </a>

          <div className="footer-contact-card">
            <strong>Need instant assistance?</strong>
            <span>Call us or chat with our booking desk anytime.</span>
            <div className="footer-card-actions">
              <Link className="button button-accent footer-book-btn" to="/book">
                Book a trip
              </Link>
              <a className="footer-wa-btn" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="page-shell footer-bottom-inner">
          <span>© {new Date().getFullYear()} Jay Mataji Tours &amp; Travels. All rights reserved.</span>
          <span>Ahmedabad • Dwarka • Somnath • Rajkot • Surat • Vadodara</span>
        </div>
      </div>
    </footer>
  );
}
