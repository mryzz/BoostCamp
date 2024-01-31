from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    phone_number = PhoneNumberField(blank=True, null=True) 
    email = models.EmailField(max_length=150)
    location = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    signup_confirmation = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    qualification_documents = models.FileField(upload_to='qualifications/', blank=True, null=True)
    role = models.CharField(max_length=10, choices=[('student', 'Student'), ('coach', 'Coach')], default='student')
    
    def __str__(self):
        return self.user.username
    
@receiver(post_save, sender=User)
def update_profile_signal(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
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
    creator = models.ForeignKey("Profile", on_delete=models.CASCADE)
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


