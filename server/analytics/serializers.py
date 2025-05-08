# server/analytics/serializers.py
from rest_framework import serializers
from .models import PageVisit, SessionData, ActivityLog
import datetime


class PageVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageVisit
        fields = ['id', 'path', 'visit_time', 'referrer']
        read_only_fields = ['id', 'visit_time']


class SessionDataSerializer(serializers.ModelSerializer):
    duration_formatted = serializers.SerializerMethodField()
    
    class Meta:
        model = SessionData
        fields = ['id', 'start_time', 'end_time', 'duration', 'duration_formatted', 
                 'pages_visited', 'is_bounce']
    
    def get_duration_formatted(self, obj):
        if obj.duration:
            minutes, seconds = divmod(obj.duration, 60)
            hours, minutes = divmod(minutes, 60)
            if hours > 0:
                return f"{hours}:{minutes:02d}:{seconds:02d}"
            return f"{minutes}:{seconds:02d}"
        return "00:00"


class ActivityLogSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = ActivityLog
        fields = ['id', 'description', 'type', 'timestamp', 'user', 'user_name']
        read_only_fields = ['id', 'timestamp']
    
    def get_user_name(self, obj):
        if obj.user:
            return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username
        return None


class AnalyticsDataSerializer(serializers.Serializer):
    """Serializer for analytics dashboard data"""
    totalVisitors = serializers.IntegerField()
    visitorsDelta = serializers.CharField()
    pageViews = serializers.IntegerField()
    pageViewsDelta = serializers.CharField()
    avgSessionDuration = serializers.CharField()
    sessionDurationDelta = serializers.CharField()
    bounceRate = serializers.CharField()
    bounceRateDelta = serializers.CharField()
    topPages = serializers.ListField(child=serializers.DictField())
    timeRange = serializers.CharField()


class DashboardSummarySerializer(serializers.Serializer):
    """Serializer for dashboard summary data"""
    websiteUrl = serializers.CharField()
    websiteName = serializers.CharField()
    status = serializers.CharField()
    visitors = serializers.IntegerField()
    pageViews = serializers.IntegerField()
    avgTime = serializers.CharField()
    bounceRate = serializers.CharField()
    recentActivity = ActivityLogSerializer(many=True)