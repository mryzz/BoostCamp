from django.contrib import admin
from django.urls import path, include, re_path
# from accounts.views import about_view, signup_view, activation_sent_view, activate, myclass_index, myclass_detail, myclass_category, new_class

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path("accounts/", include('accounts.urls')),
    path('myclass/', include('myclass.urls')),
    # path("oauth/", include("social_django.urls")),
    # path('signup/', signup_view, name="signup"),
    # path('sent/', activation_sent_view, name="activation_sent"),
    # path('activate/<slug:uidb64>/<slug:token>/', activate, name='activate'),
    # path('about/', about_view, name="about"),
    # path("", myclass_index, name="myclass_index"),
    # path("myclass/<int:pk>/", myclass_detail, name="myclass_detail"),
    # path("myclass/new/", new_class, name="new_class"),
]
