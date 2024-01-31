from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MyClassViewSet

router = DefaultRouter()
router.register(r'myclasses', MyClassViewSet)

urlpatterns = [
    path('', include(router.urls)),
]