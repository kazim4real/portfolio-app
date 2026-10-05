from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all: send every other route to the built Angular app's index.html
# so Angular's client-side router can take over. This MUST stay last.
urlpatterns += [
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html"), name="angular-app"),
]
