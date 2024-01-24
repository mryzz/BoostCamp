from django.contrib import admin
from .models import Profile, Category, MyClass, Comment

class CategoryAdmin(admin.ModelAdmin):
    pass

class ProfileAdmin(admin.ModelAdmin):
    pass

class MyClassAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(MyClass, MyClassAdmin)
admin.site.register(Comment, CommentAdmin)