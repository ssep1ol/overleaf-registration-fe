# overleaf-registration-fe

Frontend signup interface for controlled Overleaf account registration.

Static HTML/JS/CSS site that presents a registration form with domain validation, Cloudflare Turnstile CAPTCHA, and Terms of Service acceptance. Served via nginx and designed to work with the [overleaf-registration-be](https://github.com/ssep1ol/overleaf-registration-be) backend API.

## Features

- Clean, responsive signup form
- Client-side email domain validation
- Cloudflare Turnstile CAPTCHA integration
- Terms of Service modal with acceptance checkbox
- Privacy policy page
- Static site served via nginx
- Docker container deployment

## How It Works

1. User visits signup page.
2. User enters email address (validated client-side against hardcoded domain allowlist).
3. User completes Cloudflare Turnstile CAPTCHA challenge.
4. User accepts Terms of Service and Privacy Policy.
5. Form submits JSON payload to backend API endpoint.
6. User sees success/error message based on backend response.

## Tech Stack

- Vanilla JavaScript (no framework)
- HTML5 with semantic markup
- CSS (with Bootstrap-style classes from Overleaf theme)
- Cloudflare Turnstile
- nginx (Alpine-based container)

## Project Structure

```
frontend/
├── index.html              # Main signup page
├── script.js               # Form validation and submission logic
├── privacy.html            # Privacy policy page
├── main-style-*.css        # Compiled CSS from Overleaf theme
├── style.css               # Additional custom styles
├── styles.css              # Additional custom styles
├── scripts.js              # Additional JS (if any)
└── fonts/                  # Web fonts (Lato, Merriweather, Font Awesome)
nginx.conf                  # nginx server configuration
Dockerfile                  # Container image build instructions
```

## Configuration

**REQUIRED:** Before deploying, you must configure the following hardcoded values in the source files.

### 1. Cloudflare Turnstile Site Key

In `frontend/index.html`, replace the placeholder:

```html
<div class="cf-turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY_HERE"></div>
```

Change `YOUR_TURNSTILE_SITE_KEY_HERE` to your actual Turnstile site key from the Cloudflare dashboard.

### 2. Allowed Email Domains

In `frontend/script.js`, update the `allowedDomains` array:

```javascript
const allowedDomains = ['example.edu', 'university.edu']; // CONFIGURE: Replace with your allowed email domains
```

Replace with your institution's email domains (e.g., `['studenti.polito.it', 'edu.unito.it']`).

### 3. Backend API Endpoint

In `frontend/script.js`, update the fetch URL:

```javascript
const response = await fetch('https://YOUR_BACKEND_API_URL/signup', { // CONFIGURE: Replace with your backend API endpoint
```

Replace `YOUR_BACKEND_API_URL` with your actual backend service URL.

### Summary of Required Changes

| File | Line/Element | What to Replace |
|------|--------------|-----------------|
| `frontend/index.html` | Turnstile div | `YOUR_TURNSTILE_SITE_KEY_HERE` → your site key |
| `frontend/script.js` | `allowedDomains` array | `['example.edu', ...]` → your domains |
| `frontend/script.js` | `fetch()` URL | `YOUR_BACKEND_API_URL` → your backend URL |

## Hardcoded Values in script.js

The following values are embedded in the client-side JavaScript and must be configured before deployment:

- **Allowed email domains:** Set in `allowedDomains` array
- **Backend API endpoint:** Set in `fetch()` call
- **Turnstile Site Key:** Set in `index.html` `data-sitekey` attribute

## Run Locally

Serve the `frontend/` directory with any web server.

Example with Python:

```bash
cd frontend
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Run With Docker

Build image:

```bash
docker build -t overleaf-registration-fe .
```

Run container:

```bash
docker run --rm -p 8080:80 overleaf-registration-fe
```

Then visit `http://localhost:8080`.

## Deployment Notes

- **Configuration Required:** You must update the placeholders in `frontend/index.html` and `frontend/script.js` before deploying (see Configuration section above).
- nginx serves static files from `/usr/share/nginx/html`.
- All routes fall back to `index.html` for single-page behavior.
- No environment variables or build-time configuration needed - all config is hardcoded in client-side files.
- After configuration, rebuild the Docker image to include your changes.

## Terms of Service

The embedded ToS modal enforces:
- Non-commercial use only
- No copyrighted material without authorization
- No NSFW, gore, or illegal content
- Users must backup their own work
- No guarantees on service availability or data safety
- Service maintained by volunteers on best-effort basis

## Privacy Policy

Located at `frontend/privacy.html` and accessible via link in signup form.

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
