from rest_framework import serializers
from .models import MyClass

class MyClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyClass
        fields = ['id', 'title', 'description', 'coach', 'dates_times', 'location', 'fees', 'duration', 'categories', 'created_on']