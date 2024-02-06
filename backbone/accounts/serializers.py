from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'created_at', 'phone_number', 'location', 'profile_picture', 'qualification_documents', 'role']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        profile, created = Profile.objects.update_or_create(user=user, **validated_data)
        return profile