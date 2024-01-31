from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import MyClass  
from .serializers import MyClassSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly

#ModelViewSet automatically provides implementations for CRUD (create, read, update, and delete) operations.
class MyClassViewSet(viewsets.ModelViewSet):
    queryset = MyClass.objects.all()
    serializer_class = MyClassSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'fees']
    ordering_fields = ['created_on', 'fees']  # Add 'fees' to ordering fields
    ordering = ['created_on']  # Default ordering# Add 'fees' to ordering fields
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    # It passes the request context (user information to serializer) 
    def perform_create(self, serializer):
        # Get the profile associated with the user
        profile = self.request.user.profile
        serializer.save(coach=profile)