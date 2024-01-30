from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, UserLoginView

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/login/', UserLoginView.as_view(), name='user-login'),
]