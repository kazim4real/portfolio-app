# Portfolio App — Django + Angular

A single-deployable portfolio site: Django REST Framework API + Angular SPA,
with Django's runserver serving the built Angular app in production.

## Structure
```
backend/    Django project (API + admin + serves the built Angular app)
frontend/   Angular project (standalone components, Angular 18)
```

## 1. Backend setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then edit .env with real values

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Django now runs at http://127.0.0.1:8000. The admin is at
http://127.0.0.1:8000/admin/ — log in and add a **Profile**, some
**Skills**, **Projects**, **Experience** entries, and any **Blog Posts**
(set `published` to see them on the site).

## 2. Frontend setup (development)

In a second terminal:

```bash
cd frontend
npm install
npm start
```

This runs `ng serve` on http://localhost:4200 and proxies `/api/*` calls to
Django on :8000 (see `proxy.conf.json`), so keep both servers running while
you develop.

## 3. Production build (single deployable)

Once you're happy with the site:

```bash
cd frontend
npm run build
```

This outputs to `frontend/dist/portfolio-frontend/browser`, which
`backend/portfolio_project/settings.py` is already configured to find.
Then:

```bash
cd ../backend
python manage.py collectstatic --noinput
python manage.py runserver
```

Now visiting http://127.0.0.1:8000/ serves the Angular app directly from
Django — one server, one deployable. Any route not matching `/api/` or
`/admin/` falls through to Angular's `index.html` so client-side routing
(`/projects`, `/blog/my-post`, etc.) works correctly.

## Contact form emails

By default, `EMAIL_BACKEND` is set to the console backend, so submitted
messages just print to your terminal (and are always saved in the DB,
viewable in the admin under Contact Messages). To actually send emails,
switch `EMAIL_BACKEND` in `.env` to the SMTP backend and fill in
`EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` (for Gmail, use an App Password,
not your real password).

## Deploying

- Set `DEBUG=False` and a real `SECRET_KEY` and `ALLOWED_HOSTS` in `.env`.
- Use `gunicorn portfolio_project.wsgi:application` instead of `runserver`.
- Put something like Nginx in front for TLS, or deploy to Render/Railway/
  Fly.io/a VPS — since it's one Django process serving everything, most
  "deploy a Python app" guides will work as-is.
