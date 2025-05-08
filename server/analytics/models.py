
# server/analytics/models.py
from django.db import models
from django.conf import settings

from websites.models import Website


class PageVisit(models.Model):
    """Model to track page visits"""
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='page_visits')
    path = models.CharField(max_length=255)
    visitor_ip = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)
    referrer = models.CharField(max_length=500, blank=True, null=True)
    visit_time = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.website.name} - {self.path}"


class SessionData(models.Model):
    """Model to track user sessions"""
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='sessions')
    session_id = models.CharField(max_length=255)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)  # in seconds
    pages_visited = models.IntegerField(default=1)
    is_bounce = models.BooleanField(default=True)  # True if only one page visited
    
    def __str__(self):
        return f"{self.website.name} - {self.session_id[:8]}"


class ActivityLog(models.Model):
    """Model to track client activity"""
    TYPE_CHOICES = (
        ('update', 'Content Update'),
        ('visitor', 'Visitor Activity'),
        ('system', 'System Alert'),
    )
    
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='activities')
    description = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, 
                            null=True, blank=True, related_name='activities')
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.website.name} - {self.description[:30]}"