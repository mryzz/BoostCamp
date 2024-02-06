from rest_framework import serializers
from ..accounts.models import CustomUser
from .models import MyClass, Category, Availability, Location
from django.contrib.auth.models import AnonymousUser

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'

# UsernameToProfileField is a custom field that overrides the to_representation method to display the username and the to_internal_value method to convert the incoming username to a Profile object.
class UsernameToProfileField(serializers.RelatedField):
    def to_representation(self, value):
        return value.user.email

    def to_internal_value(self, data):
        try:
            user = CustomUser.objects.get(email=data)
            return user.profile  # Assuming a related_name 'profile' from User to Profile
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist")
        except CustomUser.profile.RelatedObjectDoesNotExist:
            raise serializers.ValidationError("Profile for this user does not exist")

class CategoryRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    
    def to_internal_value(self, data):
        try:
            return Category.objects.get(name=data)
        except Category.DoesNotExist:
            raise serializers.ValidationError("Category with this name does not exist")

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['street_address', 'apt', 'block', 'postal_code', 'available_online', 'at_student_convenience']

class MyClassSerializer(serializers.ModelSerializer):
    students = UsernameToProfileField(many=True, queryset=CustomUser.objects.all())
    coach = UsernameToProfileField(queryset=CustomUser.objects.all())
    category = CategoryRelatedField(queryset=Category.objects.all())
    availability = AvailabilitySerializer(many=True)
    location = LocationSerializer()

    class Meta:
        model = MyClass
        fields = ['id', 'title', 'description', 'coach', 'location', 'fees', 'category', 'students', 'open_for_booking', 'availability', 'created_on']

    def create(self, validated_data):
        # Extract location data and create a Location instance
        location_data = validated_data.pop('location')
        location = Location.objects.create(**location_data)

        # Extract student data
        students_data = validated_data.pop('students', None)

        # Extract availability data
        availabilities_data = validated_data.pop('availability')

        # Get the coach info from the request context
        coach = self.context['request'].user.profile

        # Check if the user is authenticated and is not an AnonymousUser
        if isinstance(coach, AnonymousUser):
        # Handle unauthenticated user (raise an error or return a response)
            raise ValueError("User must be authenticated to create a MyClass instance")


        # Remove 'coach' from validated_data if it exists
        validated_data.pop('coach', None)

        # myclass = MyClass.objects.create(location=location, **validated_data)
        myclass = MyClass.objects.create(coach=coach, location=location, **validated_data)
        
        # After the MyClass instance is created or updated, use the set() method on the students field to establish the many-to-many relationships.
        if students_data:
            myclass.students.set(students_data)

        # Process each availability item and associate it with MyClass
        for availability_data in availabilities_data:
            availability, created = Availability.objects.get_or_create(**availability_data)
            myclass.availability.add(availability)
        return myclass
    
    def update(self, instance, validated_data):
        location_data = validated_data.get('location')
        if location_data:
            for attr, value in location_data.items():
                setattr(instance.location, attr, value)
            instance.location.save()

        students_data = validated_data.get('students')
        if students_data is not None:
            instance.students.set(students_data)

        availabilities_data = validated_data.pop('availability', [])
        instance.availability.clear()
        for availability_data in availabilities_data:
            availability, _ = Availability.objects.get_or_create(**availability_data)
            instance.availability.add(availability)

        return super().update(instance, validated_data)