# Jay Mataji Tours & Travels

A production-ready website and booking platform for a chauffeur-driven car rental and tour agency in Gujarat, India. Built with **React 18 + Vite** on the frontend and an optional **PHP/MySQL REST API** backend.

---

## Key Features

- **Trip Planner & Instant WhatsApp Quote**: Travelers can pick destinations (Dwarka, Somnath, Gir, Rajasthan, Goa), travel dates, passenger counts, and vehicle types (Swift sedan, Ertiga MPV, Urbania 17-seater coach). Includes one-click WhatsApp quotation.
- **Online Trip Booking System**: Submits structured booking requests with unique reference codes (`JM-XXXXX`), input validation, return trip support, and immediate WhatsApp confirmation buttons.
- **Floating Contact & Helpline**: Persistent WhatsApp support and direct call widget available across the entire site.
- **Why Choose Us & Trust Assurances**: Transparent per-kilometer billing, sanitized vehicles, polite highway drivers, and flexible temple darshan halts.
- **Guest Testimonials & FAQ**: Genuine traveler reviews and an interactive frequently asked questions accordion.
- **Staff Admin Dashboard**: Staff login (`/admin`) to search, review, and manage booking statuses (`new`, `contacted`, `confirmed`, `completed`, `cancelled`) with an audit history.
- **Out-of-the-Box Ready**: Features built-in curated destination fallbacks and local storage resilience, meaning the website runs seamlessly out-of-the-box even before MySQL is configured!

---

## Quick Start (Frontend Standalone)

To preview and use the website immediately:

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. The site will load all destinations, trip calculator, interactive booking flow, and WhatsApp links.

---

## Full-Stack Setup (With PHP & MySQL)

### 1. Database Setup
1. Create a MySQL database named `jay_mataji`.
2. Import `jay_mataji.sql` into your database.
3. Set your environment variables in your hosting panel or environment:
   ```env
   DB_HOST=localhost
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=jay_mataji
   ```

### 2. Seed Admin Account
To create your admin account for managing bookings:
```bash
php server/scripts/seed-admin.php admin YourStrongPassword
```
Then log in at `/admin`.

### 3. Start Backend & Frontend
In terminal 1 (start PHP server):
```bash
php -S 127.0.0.1:8000
```

In terminal 2 (start Vite):
```bash
npm run dev
```

---

## Production Build & Apache Deployment

1. Run the production build:
   ```bash
   npm run build
   ```
2. Deploy the repository files (including the generated `build` folder) to your Apache/cPanel server.
3. The root `index.php` dynamically loads `build/index.html` and configures URL paths automatically, supporting both root domain and subfolder hosting.
4. `.htaccess` handles client-side React routes and protects sensitive folders (`server`, `src`, `.git`, `.env`).

---

## Customizing Contact Information

Edit `src/features/contact/contact.js` or set Vite environment variables in `.env`:

```env
VITE_WHATSAPP_NUMBER=919825123456
VITE_PHONE_DISPLAY=+91 98251 23456
VITE_COMPANY_EMAIL=jaymatajitoursgujarat@gmail.com
```

---

## Project Structure

See [docs/PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md) for detailed folder organization.
