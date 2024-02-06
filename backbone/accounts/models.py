from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # Adjust related_name for groups and user_permissions
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name="customuser_set", # Custom reverse relation name
        related_query_name="customuser",  # Custom query name for reverse queries
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="customuser_set",
        related_query_name="customuser",
    )

    def __str__(self):
        return self.email

class BasicProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    phone_number = PhoneNumberField(blank=True, null=True) 
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], blank=True)
    location = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    introduction = models.TextField(blank=True)
    # Account information fields like email and password are handled by Django's User model

    def __str__(self):
        return self.user.username

class CoachProfile(models.Model):
    basic_profile = models.OneToOneField(BasicProfile, on_delete=models.CASCADE, related_name='coach_profile')
    title = models.CharField(max_length=255)
    specialties = models.CharField(max_length=255)
    experience = models.TextField()
    achievements = models.TextField()
    certification_name = models.CharField(max_length=255)
    certification = models.FileField(upload_to='certifications/', blank=True, null=True)
    years_of_experience = models.IntegerField()
    testimonials = models.TextField()
    institution = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    education_certification = models.FileField(upload_to='education_certifications/', blank=True, null=True)
    linkedin_url = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.basic_profile.user.username
    
@receiver(post_save, sender=CustomUser)
def update_profile_signal(sender, instance, created, **kwargs):
    if created:
        BasicProfile.objects.create(user=instance)
    else:
        instance.profile.save()


class Category(models.Model):
    name = models.CharField(max_length=30)
    myclass = models.ManyToManyField("MyClass", related_name="category")
    class Meta:
        verbose_name_plural = "categories"
    def __str__(self):
        return self.name

class MyClass(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    coach = models.ForeignKey(CoachProfile, on_delete=models.CASCADE, related_name='classes')
    # Why one to many? One profile can have many classes, but you can’t have an myclass that corresponds to many profiles.
    # Why on_delete=models.CASCADE? If a profile is deleted, then you don’t want the classes related to it hanging around. 
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    categories = models.ManyToManyField("Category", related_name="classes")
    
    def __str__(self):
        return self.title
    
class Comment(models.Model):
    author = models.CharField(max_length=60)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    myclass = models.ForeignKey("MyClass", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author} on '{self.post}'"


