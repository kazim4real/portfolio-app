"""
Django settings for portfolio_project.

Django serves the built Angular app as static files (single-deployable setup).
Run `npm run build` in /frontend, then Django will serve the output from
frontend/dist via the catch-all view in core/urls.py + STATICFILES.
"""

from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("SECRET_KEY", default="dev-only-insecure-secret-key")
DEBUG = env("DEBUG", default=True)
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["127.0.0.1", "localhost"])

# Needed for the Django admin to accept POST requests (login, forms) once the
# site is served over https on Azure. Without this, admin login fails with a
# CSRF error because the request's Origin header won't be trusted by default.
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "core",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "portfolio_project.urls"

# Angular's build output. In production (Azure), the GitHub Actions workflow
# builds Angular and copies it to backend/frontend_dist before deploying, so
# only the backend/ folder needs to be uploaded. Locally, it's still read
# straight from frontend/dist after you run `npm run build`.
ANGULAR_DIST_DIR = BASE_DIR / "frontend_dist"
if not ANGULAR_DIST_DIR.exists():
    ANGULAR_DIST_DIR = BASE_DIR.parent / "frontend" / "dist" / "portfolio-frontend" / "browser"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [ANGULAR_DIST_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "portfolio_project.wsgi.application"

if env("DB_NAME", default=""):
    # Production / anywhere a real Postgres database is configured via env vars.
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env("DB_NAME"),
            "USER": env("DB_USER"),
            "PASSWORD": env("DB_PASSWORD"),
            "HOST": env("DB_HOST"),
            "PORT": env("DB_PORT", default="5432"),
            "OPTIONS": {"sslmode": env("DB_SSLMODE", default="require")},
        }
    }
else:
    # SQLite. Locally this just sits next to manage.py, zero setup required.
    # On Azure App Service (Linux), the deployed code folder is replaced on
    # every push, so set SQLITE_PATH=/home/db.sqlite3 in App Settings there —
    # /home is the one directory that persists across deploys.
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": env("SQLITE_PATH", default=str(BASE_DIR / "db.sqlite3")),
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files: Django's own static assets (admin, DRF browsable API).
# Angular's built JS/CSS bundles are served separately via WHITENOISE_ROOT
# below, not through STATICFILES_DIRS — Angular's index.html requests files
# like /main-xxxx.js at the site root, not under /static/.
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": (
            "whitenoise.storage.CompressedManifestStaticFilesStorage"
            if not DEBUG
            else "django.contrib.staticfiles.storage.StaticFilesStorage"
        ),
    },
}

# Serves Angular's built files (index.html, main-xxxx.js, styles-xxxx.css)
# directly from the site root via Whitenoise, so paths like /main-xxxx.js
# resolve correctly instead of 404ing or falling through to the catch-all.
WHITENOISE_ROOT = ANGULAR_DIST_DIR if ANGULAR_DIST_DIR.exists() else None

# Media (uploaded images for projects, resume PDF, etc.). Same deal as
# SQLITE_PATH above — set MEDIA_ROOT=/home/media in Azure App Settings so
# uploads survive deploys instead of living in the replaced code folder.
MEDIA_URL = "media/"
MEDIA_ROOT = env("MEDIA_ROOT", default=str(BASE_DIR / "media"))

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
}

# CORS: only needed while running `ng serve` separately during development.
# In production (Django serving the built Angular app) this isn't used since
# requests are same-origin.
CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS", default=["http://localhost:4200"]
)

# Email / contact form
EMAIL_BACKEND = env(
    "EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend"
)
EMAIL_HOST = env("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = env.int("EMAIL_PORT", default=587)
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default="")
CONTACT_RECEIVER_EMAIL = env("CONTACT_RECEIVER_EMAIL", default=EMAIL_HOST_USER)
