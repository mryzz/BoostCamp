from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import BasicProfile, CoachProfile
from .serializers import BasicProfileSerializer, CoachProfileSerializer, CustomUserSerializer
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class BasicProfileViewSet(viewsets.ModelViewSet):
    serializer_class = BasicProfileSerializer
    queryset = BasicProfile.objects.all()

    def get_queryset(self):
        queryset = BasicProfile.objects.all()
        ordering = self.request.query_params.get('ordering', 'created_at')
        return queryset.order_by(ordering)

class CoachProfileViewSet(viewsets.ModelViewSet):
    serializer_class = CoachProfileSerializer
    queryset = CoachProfile.objects.all()

    def get_queryset(self):
        queryset = CoachProfile.objects.all()
        ordering = self.request.query_params.get('ordering', 'created_at')
        return queryset.order_by(ordering)

class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Assuming your User model has an email field and is used as a username field
        user = authenticate(username=email, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserSignUpView(APIView):
    def post(self, request, *args, **kwargs):
        user_serializer = CustomUserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreateOrUpdateBasicProfile(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            profile, created = BasicProfile.objects.get_or_create(user=request.user)
            serializer = BasicProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Basic profile created or updated successfully"}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateOrUpdateCoachProfile(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        basic_profile, _ = BasicProfile.objects.get_or_create(user=request.user)
        try:
            coach_profile, created = CoachProfile.objects.get_or_create(basic_profile=basic_profile)
            serializer = CoachProfileSerializer(coach_profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Coach profile created or updated successfully"}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response({"error": "Bad request or Token not found."}, status=status.HTTP_400_BAD_REQUEST)