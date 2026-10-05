from django.db import models
from django.utils.text import slugify


class Profile(models.Model):
    """Singleton-ish model holding your bio/about info. Manage via admin."""

    name = models.CharField(max_length=120)
    title = models.CharField(max_length=200, help_text="e.g. 'Full-Stack Developer'")
    title_en = models.CharField(max_length=200, blank=True)
    bio = models.TextField()
    bio_en = models.TextField(blank=True)
    email = models.EmailField()
    location = models.CharField(max_length=120, blank=True)
    avatar = models.ImageField(upload_to="profile/", blank=True, null=True)
    resume_file = models.FileField(upload_to="resume/", blank=True, null=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"


class Skill(models.Model):
    class Category(models.TextChoices):
        FRONTEND = "frontend", "Frontend"
        BACKEND = "backend", "Backend"
        DATABASE = "database", "Database"
        DEVOPS = "devops", "DevOps"
        TOOLS = "tools", "Tools"
        OTHER = "other", "Other"

    name = models.CharField(max_length=80)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)
    proficiency = models.PositiveSmallIntegerField(
        default=3, help_text="1 (learning) to 5 (expert)"
    )
    icon = models.CharField(
        max_length=80, blank=True, help_text="Optional icon name/class, e.g. 'devicon-python-plain'"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True, blank=True)
    short_description = models.CharField(max_length=240)
    short_description_en = models.CharField(max_length=240, blank=True)
    description = models.TextField()
    description_en = models.TextField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    tech_stack = models.ManyToManyField(Skill, blank=True, related_name="projects")
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-featured", "order", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Experience(models.Model):
    company = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    location = models.CharField(max_length=120, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True, help_text="Leave blank if current")
    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-start_date"]

    def __str__(self):
        return f"{self.role} @ {self.company}"

    @property
    def is_current(self):
        return self.end_date is None


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    excerpt = models.CharField(max_length=280)
    excerpt_en = models.CharField(max_length=280, blank=True)
    content = models.TextField(help_text="Markdown or plain text")
    content_en = models.TextField(blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}> - {self.subject or '(no subject)'}"
