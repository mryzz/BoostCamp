from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (BasicProfileViewSet, CoachProfileViewSet, UserLoginView, 
                    UserSignUpView, LogoutView, CreateOrUpdateBasicProfile, 
                    CreateOrUpdateCoachProfile)

router = DefaultRouter()
router.register(r'basic-profiles', BasicProfileViewSet)
router.register(r'coach-profiles', CoachProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', UserSignUpView.as_view(), name='user-signup'),
    path('api-auth/login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    # Update paths for class-based profile views
    path('profiles/basic/', CreateOrUpdateBasicProfile.as_view(), name='create-update-basic-profile'),
    path('profiles/coach/', CreateOrUpdateCoachProfile.as_view(), name='create-update-coach-profile'),
]