# Jay Mataji Tours & Travels

The site uses a React + Vite frontend with the existing PHP/MySQL database for destination data.

## Local development

1. Import `jay_mataji.sql` into the `jay_mataji` MySQL database. Set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in the PHP host's environment or hosting control panel; `.env.example` is a reference only because PHP does not load `.env` files by itself.
2. Install the frontend dependencies with `npm install`.
3. Start PHP's built-in server from the repository root: `php -S 127.0.0.1:8000`.
4. In another terminal, start Vite with `npm run dev`.

For an existing database, run `server/migrations/2026-10-10-optimize-rajasthan-image.sql` once after deploying the new asset.

Vite serves the React app at `http://127.0.0.1:5173` and forwards `/api` requests to PHP at port 8000. Set `VITE_API_TARGET` if PHP runs at a different URL.

## Production

Run `npm run build`, then deploy the repository with the generated `build` directory to an Apache/PHP host. The root `index.php` serves the built React app and adjusts paths to the repository's URL (whether it is hosted at the domain root or under a project folder). `.htaccess` sends destination detail routes back to React, and the PHP API reads from the existing MySQL tables:

- `GET /api/destinations.php`
- `GET /api/destination.php?id=1`

Keep `server/config/database.php` and `jay_mataji.sql` available to the PHP host. The root `config.php` and `api/` files are small compatibility entry points and should remain in place. The `build` output is generated and intentionally excluded from version control.

## Project layout

See [docs/PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md) for a beginner-friendly map of the frontend, backend, assets, and legacy files.
