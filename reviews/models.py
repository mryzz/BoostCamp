from django.db import models
from myclass.models import MyClass
from accounts.models import Profile

class Review(models.Model):
    class_reviewed = models.ForeignKey(MyClass, on_delete=models.CASCADE)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return f"Review by {self.author.user.username} for {self.class_reviewed.title}"