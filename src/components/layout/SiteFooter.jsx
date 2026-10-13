import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { appPath } from '../../app/paths.js';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/" aria-label="Jay Mataji Tours and Travels home">
            <img src={appPath('/assets/brand-wordmark-light.svg')} alt="" />
          </Link>
          <p>Car and driver across Gujarat and beyond. Tell us where you want to go and we will send you a price today.</p>
        </div>
        <div className="footer-links">
          <p className="eyebrow">Discover</p>
          <a href={appPath('/#destination')}>Popular places</a>
          <a href={appPath('/#choose-your-ride')}>Travel in comfort</a>
          <a href={appPath('/#about_us')}>Our story</a>
        </div>
        <a className="footer-cta" href={appPath('/#plan-trip')}>
          <span>
            Ready when you are.
            <small>Let’s make it a journey to remember.</small>
          </span>
          <ArrowUpRight size={20} />
        </a>
        <div className="footer-contact"><strong>Planning a journey?</strong><span>Send a trip request and we’ll confirm availability and your quote.</span><Link to="/book">Book a trip</Link></div>
      </div>
      <div className="footer-bottom">
        <div className="page-shell footer-bottom-inner">
          <span>© {new Date().getFullYear()} Jay Mataji Tours &amp; Travels</span>
          <span>Made for the long way round.</span>
        </div>
      </div>
    </footer>
  );
}
