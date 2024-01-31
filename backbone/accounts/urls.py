from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, UserLoginView, UserSignUpView, LogoutView

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', UserSignUpView.as_view(), name='user-signup'),
    path('api-auth/login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]