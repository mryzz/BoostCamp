from rest_framework import serializers
from django.contrib.auth.models import User
from .models import MyClass, Category, Availability, Location

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'

# UsernameToProfileField is a custom field that overrides the to_representation method to display the username and the to_internal_value method to convert the incoming username to a Profile object.
class UsernameToProfileField(serializers.RelatedField):
    def to_representation(self, value):
        return value.user.username

    def to_internal_value(self, data):
        try:
            user = User.objects.get(username=data)
            return user.profile  # Assuming a related_name 'profile' from User to Profile
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this username does not exist")
        except User.profile.RelatedObjectDoesNotExist:
            raise serializers.ValidationError("Profile for this user does not exist")

class CategoryRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    
    def to_internal_value(self, data):
        try:
            return Category.objects.get(name=data)
        except Category.DoesNotExist:
            raise serializers.ValidationError("Category with this name does not exist")

class MyClassSerializer(serializers.ModelSerializer):
    students = UsernameToProfileField(many=True, queryset=User.objects.all())
    coach = UsernameToProfileField(queryset=User.objects.all())
    category = CategoryRelatedField(queryset=Category.objects.all())
    number_of_students = serializers.IntegerField(read_only=True)
    availability = AvailabilitySerializer(many=True)

    class Meta:
        model = MyClass
        fields = ['id', 'title', 'description', 'coach', 'dates_times', 'location', 'fees', 'duration', 'category', 'students', 'open_for_booking', 'number_of_students', 'created_on']

    def create(self, validated_data):
        availabilities_data = validated_data.pop('availability')
        myclass = MyClass.objects.create(**validated_data)
        for availability_data in availabilities_data:
            availability, created = Availability.objects.get_or_create(**availability_data)
            myclass.availability.add(availability)
        return myclass
    
    def update(self, instance, validated_data):
        instance.availability.clear()
        availabilities_data = validated_data.pop('availability')
        for availability_data in availabilities_data:
            availability, created = Availability.objects.get_or_create(**availability_data)
            instance.availability.add(availability)
        return super().update(instance, validated_data)
