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
        user_serializer = CustomUserSerializer(data=request.data.get('user'))
        if user_serializer.is_valid():
            user = user_serializer.save()
            profile_data = request.data.get('profile')
            profile_serializer = BasicProfileSerializer(data=profile_data, context={'request': request})
            if profile_serializer.is_valid():
                profile_serializer.save(user=user)
                return Response({"message": "User and profile created successfully"}, status=status.HTTP_201_CREATED)
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response({"error": "Bad request or Token not found."}, status=status.HTTP_400_BAD_REQUEST)