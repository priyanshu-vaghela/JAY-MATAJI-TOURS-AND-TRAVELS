import { MessageCircle, Phone } from 'lucide-react';
import { callUrl, phoneDisplay, whatsappUrl } from '../../features/contact/contact.js';

export default function FloatingContact() {
  return (
    <aside className="floating-contact" aria-label="Quick contact options">
      <a
        className="floating-contact-btn floating-whatsapp"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="floating-icon-wrap">
          <MessageCircle size={22} strokeWidth={2.2} />
        </span>
        <span className="floating-text">Chat on WhatsApp</span>
      </a>

      <a
        className="floating-contact-btn floating-phone"
        href={callUrl()}
        aria-label={`Call us at ${phoneDisplay}`}
        title={`Call ${phoneDisplay}`}
      >
        <span className="floating-icon-wrap">
          <Phone size={20} strokeWidth={2.2} />
        </span>
        <span className="floating-text">Call {phoneDisplay}</span>
      </a>
    </aside>
  );
}
