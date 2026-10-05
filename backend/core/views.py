from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import BlogPost, Experience, Profile, Project, Skill
from .serializers import (
    BlogPostDetailSerializer,
    BlogPostListSerializer,
    ContactMessageSerializer,
    ExperienceSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
)


class ProfileView(APIView):
    """Returns the single Profile record (the first/only one created in admin)."""

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({"detail": "Profile not set up yet."}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProfileSerializer(profile, context={"request": request}).data)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().prefetch_related("tech_stack")
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        qs = super().get_queryset()
        featured = self.request.query_params.get("featured")
        if featured is not None:
            qs = qs.filter(featured=featured.lower() == "true")
        return qs


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    pagination_class = None


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    pagination_class = None


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(published=True)
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BlogPostDetailSerializer
        return BlogPostListSerializer


class ContactView(APIView):
    """Validates the contact form, saves it, and emails the site owner."""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_message = serializer.save()

        try:
            send_mail(
                subject=f"Portfolio contact form: {contact_message.subject or 'New message'}",
                message=(
                    f"From: {contact_message.name} <{contact_message.email}>\n\n"
                    f"{contact_message.message}"
                ),
                from_email=settings.EMAIL_HOST_USER or "noreply@example.com",
                recipient_list=[settings.CONTACT_RECEIVER_EMAIL],
                fail_silently=True,
            )
        except Exception:
            # Message is already saved in the DB even if email sending fails.
            pass

        return Response({"detail": "Message sent, thank you!"}, status=status.HTTP_201_CREATED)
