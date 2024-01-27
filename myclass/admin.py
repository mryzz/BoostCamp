from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import MyClass, Category

class CategoryFilter(admin.SimpleListFilter):
    title = _('category')  # Human-readable title
    parameter_name = 'category'  # URL query parameter

    def lookups(self, request, model_admin):
        categories = set([c for c in Category.objects.all()])
        return [(c.id, c.name) for c in categories]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(categories__id__exact=self.value())
        return queryset

class MyClassAdmin(admin.ModelAdmin):
    # ... other configurations ...
    list_filter = ('coach', CategoryFilter)  # Use custom filter

admin.site.register(MyClass, MyClassAdmin)