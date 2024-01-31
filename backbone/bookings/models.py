from django.db import models
from myclass.models import MyClass
from accounts.models import Profile

class Booking(models.Model):
    class_booked = models.ForeignKey(MyClass, on_delete=models.CASCADE)
    student = models.ForeignKey(Profile, on_delete=models.CASCADE)
    booking_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('completed', 'Completed')])

    def __str__(self):
        return f"{self.class_booked.title} - {self.student.user.username}"