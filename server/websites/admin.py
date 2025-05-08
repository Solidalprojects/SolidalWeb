# server/websites/admin.py
from django.contrib import admin
from .models import Website, WebsiteSection

class WebsiteSectionInline(admin.TabularInline):
    model = WebsiteSection
    extra = 1

@admin.register(Website)
class WebsiteAdmin(admin.ModelAdmin):
    list_display = ('name', 'domain', 'owner', 'status', 'created_at', 'is_active')
    list_filter = ('status', 'is_active', 'created_at')
    search_fields = ('name', 'domain', 'owner__username', 'owner__email')
    inlines = [WebsiteSectionInline]
    date_hierarchy = 'created_at'
    
@admin.register(WebsiteSection)
class WebsiteSectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'key', 'order')
    list_filter = ('website',)
    search_fields = ('name', 'key', 'website__name')
    ordering = ('website', 'order')