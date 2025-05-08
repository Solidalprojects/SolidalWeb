# server/websites/models.py
from django.db import models
from django.conf import settings
from django.utils.text import slugify


class Website(models.Model):
    """Model for websites created for clients"""
    STATUS_CHOICES = (
        ('development', 'Development'),
        ('live', 'Live'),
        ('maintenance', 'Maintenance'),
        ('offline', 'Offline'),
    )
    
    name = models.CharField(max_length=100)
    domain = models.CharField(max_length=255, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='websites')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='development')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class WebsiteSection(models.Model):
    """Model for editable sections of a website"""
    website = models.ForeignKey(Website, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=100)
    key = models.CharField(max_length=100)
    content = models.JSONField(default=dict)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        unique_together = ['website', 'key']
    
    def __str__(self):
        return f"{self.website.name} - {self.name}"
