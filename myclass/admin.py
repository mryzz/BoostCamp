from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import MyClass, Category, Availability, Location

class CategoryFilter(admin.SimpleListFilter):
    title = _('category')  # Human-readable title
    parameter_name = 'category'  # URL query parameter

    def lookups(self, request, model_admin):
        categories = set([c for c in Category.objects.all()])
        return [(c.id, c.name) for c in categories]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(category__id__exact=self.value())
        return queryset

class LocationAdmin(admin.ModelAdmin):
    list_display = ('street_address', 'apt', 'block', 'postal_code', 'available_online', 'at_student_convenience')
    search_fields = ('street_address', 'block', 'postal_code')

class MyClassAdmin(admin.ModelAdmin):
    list_filter = ('coach', CategoryFilter)  # Use custom filter
    def display_student_pks(self, obj):
        return ", ".join(str(student.pk) for student in obj.students.all())
    display_student_pks.short_description = 'Student IDs'

admin.site.register(MyClass, MyClassAdmin)
admin.site.register(Category)
admin.site.register(Availability) 
admin.site.register(Location)
