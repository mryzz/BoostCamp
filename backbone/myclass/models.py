from django.db import models
from accounts.models import Profile  # Import the Profile model from accounts app
from django.utils.translation import gettext_lazy as _

def my_default_category():
    # Return a default category ID or instance
    # Ensure this category exists in your database
    return Category.objects.get_or_create(name='Academic')[0].id

def default_coach():
    return Profile.objects.first().id

class Category(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name
    
class Location(models.Model):
    street_address = models.CharField(max_length=255)
    apt = models.CharField(max_length=100)
    block = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    available_online = models.BooleanField(default=False)
    at_student_convenience = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.street_address}, {self.block}, {self.apt}, Singapore, {self.postal_code}"

class Availability(models.Model):
    class Days(models.TextChoices):
        MONDAY = 'Mon', _('Monday')
        TUESDAY = 'Tue', _('Tuesday')
        WEDNESDAY = 'Wed', _('Wednesday')
        THURSDAY = 'Thu', _('Thursday')
        FRIDAY = 'Fri', _('Friday')
        SATURDAY = 'Sat', _('Saturday')
        SUNDAY = 'Sun', _('Sunday')

    from_day = models.CharField(max_length=3, choices=Days.choices)
    to_day = models.CharField(max_length=3, choices=Days.choices)
    from_time = models.TimeField()
    to_time = models.TimeField()
    coach = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='availabilities', default=default_coach)

    def __str__(self):
        return f"{self.from_day} to {self.to_day}, {self.from_time} to {self.to_time}"
    
    class Meta:
        verbose_name_plural = "Availabilities"

class MyClass(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    coach = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='coached_classes')  # Renamed from 'creator' to 'coach'
    location = models.OneToOneField(Location, on_delete=models.CASCADE, related_name='myclass')
    availability = models.ManyToManyField(Availability, related_name='classes')
    fees = models.DecimalField(max_digits=6, decimal_places=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='classes', default=my_default_category)
    students = models.ManyToManyField(Profile, related_name='enrolled_classes', blank=True) # ManyToManyField linking to the Profile model. This field represents the students enrolled in the class.
    open_for_booking = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

