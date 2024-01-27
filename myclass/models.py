from django.db import models
from accounts.models import Profile  # Import the Profile model from accounts app

def my_default_category():
    # Return a default category ID or instance
    # Ensure this category exists in your database
    return Category.objects.get_or_create(name='Academics')[0].id

class Category(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class MyClass(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    coach = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='coached_classes')  # Renamed from 'creator' to 'coach'
    dates_times = models.TextField()  # Assuming multiple dates and times; consider a more structured approach
    location = models.CharField(max_length=255)  # Simplified for example; consider linking to an Address model
    fees = models.DecimalField(max_digits=6, decimal_places=2)
    duration = models.DurationField()  # Store as a duration
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='classes', default=my_default_category)
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title2

