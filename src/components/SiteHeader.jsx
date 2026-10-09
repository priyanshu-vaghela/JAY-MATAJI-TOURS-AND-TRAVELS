import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { appPath } from '../paths.js';

const navigation = [
  ['About', 'about_us'],
  ['Destinations', 'destination'],
  ['Our fleet', 'choose-your-ride'],
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  function sectionHref(id) {
    return pathname === '/' ? `#${id}` : appPath(`/#${id}`);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner page-shell">
          <Link className="brand" to="/" aria-label="Jay Mataji Tours and Travels home" onClick={closeMenu}>
            <img src="/assets/header-section/Heliotrope-removebg-preview.png" alt="" />
            <span>
              Jay Mataji
              <small>Tours &amp; Travels</small>
            </span>
          </Link>

          <button
            className="menu-toggle icon-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navigation.map(([label, id]) => (
              <a key={id} href={sectionHref(id)} onClick={closeMenu}>
                {label}
              </a>
            ))}
            <a className="nav-cta" href={sectionHref('plan-trip')} onClick={closeMenu}>
              Plan a journey <ArrowUpRight size={15} strokeWidth={1.8} />
            </a>
          </nav>
        </div>
      </header>
      {menuOpen && <button className="nav-backdrop" aria-label="Close navigation menu" onClick={closeMenu} />}
    </>
  );
}
