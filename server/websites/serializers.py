# server/websites/serializers.py
from rest_framework import serializers
from .models import Website, WebsiteSection


class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Website
        fields = ['id', 'name', 'domain', 'status', 'created_at', 'updated_at', 
                 'description', 'is_active']
        read_only_fields = ['id', 'created_at', 'updated_at']


class WebsiteSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteSection
        fields = ['id', 'name', 'key', 'content', 'order']
        read_only_fields = ['id']