from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import MyClass
from .serializers import MyClassSerializer

#ModelViewSet automatically provides implementations for CRUD (create, read, update, and delete) operations.
class MyClassViewSet(viewsets.ModelViewSet):
    queryset = MyClass.objects.all()
    serializer_class = MyClassSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['categories', 'fees']
    ordering_fields = ['created_on', 'fees']  # Add 'fees' to ordering fields
    ordering = ['created_on']  # Default ordering# Add 'fees' to ordering fields
