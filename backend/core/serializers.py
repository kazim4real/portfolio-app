from rest_framework import serializers

from .models import BlogPost, ContactMessage, Experience, Profile, Project, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "proficiency", "icon", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    tech_stack = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "short_description", "short_description_en",
            "description", "description_en", "image", "tech_stack", "github_url",
            "live_url", "featured", "order", "created_at", "updated_at",
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    is_current = serializers.ReadOnlyField()

    class Meta:
        model = Experience
        fields = [
            "id", "company", "role", "location", "start_date", "end_date",
            "description", "description_en", "order", "is_current",
        ]


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["id", "title", "title_en", "slug", "excerpt", "excerpt_en", "created_at"]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["id", "title", "title_en", "slug", "excerpt", "excerpt_en", "content", "content_en", "created_at", "updated_at"]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id", "name", "title", "title_en", "bio", "bio_en", "email", "location", "avatar",
            "resume_file", "github_url", "linkedin_url", "twitter_url",
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]
