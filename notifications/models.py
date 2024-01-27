from django.db import models
from accounts.models import Profile

class Notification(models.Model):
    recipient = models.ForeignKey(Profile, on_delete=models.CASCADE)
    message = models.TextField()
    sent_time = models.DateTimeField(auto_now_add=True)
    notification_type = models.CharField(max_length=20, choices=[('email', 'Email'), ('in-app', 'In-App')])

    def __str__(self):
        return f"Notification to {self.recipient.user.username}"