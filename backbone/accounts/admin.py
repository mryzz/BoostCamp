from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import BasicProfile, CoachProfile, Category, MyClass, Comment, CustomUser

class CategoryAdmin(admin.ModelAdmin):
    pass

class BasicProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'phone_number', 'gender', 'location')
    search_fields = ('user__email', 'first_name', 'last_name')

class CoachProfileAdmin(admin.ModelAdmin):
    list_display = ('basic_profile', 'title', 'specialties', 'years_of_experience')
    search_fields = ('basic_profile__user__email', 'title', 'specialties')

class MyClassAdmin(admin.ModelAdmin):
    list_display = ('title', 'coach', 'created_on', 'last_modified')
    search_fields = ('title', 'coach__basic_profile__user__email')
    list_filter = ('categories',)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'myclass', 'created_on')
    search_fields = ('author', 'myclass__title')

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email', 'first_name', 'last_name')
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    ordering = ('email',)

# Register your models here.
admin.site.register(BasicProfile, BasicProfileAdmin)
admin.site.register(CoachProfile, CoachProfileAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(MyClass, MyClassAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CustomUser, CustomUserAdmin)