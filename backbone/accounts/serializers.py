from rest_framework import serializers
from .models import BasicProfile, CoachProfile,  CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class BasicProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = BasicProfile
        fields = ['user', 'first_name', 'last_name', 'phone_number', 'gender', 'location', 'profile_picture', 'introduction']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        basic_profile, created = BasicProfile.objects.update_or_create(user=user, **validated_data)
        return basic_profile

class CoachProfileSerializer(serializers.ModelSerializer):
    basic_profile = BasicProfileSerializer()

    class Meta:
        model = CoachProfile
        fields = ['basic_profile', 'title', 'specialties', 'experience', 'achievements', 'certification_name', 'certification', 'years_of_experience', 'testimonials', 'institution', 'field_of_study', 'education_certification', 'linkedin_url']

    def create(self, validated_data):
        basic_profile_data = validated_data.pop('basic_profile')
        basic_profile = BasicProfileSerializer.create(BasicProfileSerializer(), validated_data=basic_profile_data)
        coach_profile, created = CoachProfile.objects.update_or_create(basic_profile=basic_profile, **validated_data)
        return coach_profile