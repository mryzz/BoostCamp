from django.urls import path
from .views import myclass_index, myclass_detail, new_class, myclass_category

urlpatterns = [
    path("", myclass_index, name="myclass_index"),
    path("<int:pk>/", myclass_detail, name="myclass_detail"),
    path("new/", new_class, name="new_class"),
    path("category/<category>/", myclass_category, name="myclass_category"),
]