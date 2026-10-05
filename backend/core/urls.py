from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    BlogPostViewSet,
    ContactView,
    ExperienceViewSet,
    ProfileView,
    ProjectViewSet,
    SkillViewSet,
)

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("skills", SkillViewSet, basename="skill")
router.register("experience", ExperienceViewSet, basename="experience")
router.register("blog", BlogPostViewSet, basename="blogpost")

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile"),
    path("contact/", ContactView.as_view(), name="contact"),
    path("", include(router.urls)),
]
