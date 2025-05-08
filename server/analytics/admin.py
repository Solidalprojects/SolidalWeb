# server/analytics/admin.py
from django.contrib import admin
from .models import PageVisit, SessionData, ActivityLog

@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ('website', 'path', 'visit_time', 'visitor_ip')
    list_filter = ('website', 'visit_time')
    search_fields = ('path', 'visitor_ip', 'user_agent', 'website__name')
    date_hierarchy = 'visit_time'

@admin.register(SessionData)
class SessionDataAdmin(admin.ModelAdmin):
    list_display = ('website', 'session_id', 'start_time', 'duration', 'pages_visited', 'is_bounce')
    list_filter = ('website', 'start_time', 'is_bounce')
    search_fields = ('session_id', 'website__name')
    date_hierarchy = 'start_time'

@admin.register(ActivityLog)
class ActivityLogAdmin(admin.ModelAdmin):
    list_display = ('website', 'description', 'type', 'timestamp', 'user')
    list_filter = ('website', 'type', 'timestamp')
    search_fields = ('description', 'website__name', 'user__username')
    date_hierarchy = 'timestamp'