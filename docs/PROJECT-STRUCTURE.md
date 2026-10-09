# Project structure

This project has a React frontend and a small PHP/MySQL backend. The folders are arranged by responsibility so it is easier to find the right file before making a change.

```text
src/
  app/                         # React startup, routes, and app-wide URL helpers
  components/layout/           # Shared site header and footer
  features/                    # Code grouped by business feature
    contact/                   # WhatsApp contact helpers
    destinations/api/          # Frontend calls to destination API endpoints
  pages/                       # Route-level React pages
  styles/                      # Global CSS

server/                        # Private PHP implementation (blocked from direct web access)
  api/                         # PHP endpoint implementations
  config/                      # Database connection setup

api/                           # Thin public URL entry points for the PHP API
assets/                        # Images used by the site
legacy/                        # Previous PHP page fragments, CSS, and JavaScript (not used by React)
docs/                          # Project documentation
```

## Where to make common changes

| Change | File or folder |
| --- | --- |
| Add a new page or URL | `src/pages/` and `src/app/App.jsx` |
| Change navigation or footer | `src/components/layout/` |
| Change the WhatsApp message or number | `src/features/contact/contact.js` |
| Call or add a frontend API function | `src/features/<feature>/api/` |
| Change a PHP API endpoint | `server/api/` |
| Change database settings | `server/config/database.php` or environment variables |
| Change global design styles | `src/styles/global.css` |

`api/` and the root `config.php` are compatibility files. Keep them in place because hosting and frontend code use the public `/api/...` URLs.
