# server/analytics/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import PageVisit, SessionData, ActivityLog
from .serializers import (
    PageVisitSerializer, SessionDataSerializer, ActivityLogSerializer,
    AnalyticsDataSerializer, DashboardSummarySerializer
)
from websites.models import Website
from django.utils import timezone
from django.db.models import Count, Avg, F, ExpressionWrapper, fields, Q
from django.db.models.functions import TruncDay, TruncWeek, TruncMonth
import datetime
import random  # For demo data


class IsWebsiteOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners or agency admins to access the analytics
    """
    def has_permission(self, request, view):
        website_id = request.query_params.get('website_id')
        if not website_id:
            return False
        
        try:
            website = Website.objects.get(id=website_id)
            return website.owner == request.user or request.user.is_agency_admin
        except Website.DoesNotExist:
            return False


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated, IsWebsiteOwnerOrAdmin])
def analytics_data(request):
    """
    Get analytics data for a website
    """
    website_id = request.query_params.get('website_id')
    time_range = request.query_params.get('time_range', 'month')
    
    try:
        website = Website.objects.get(id=website_id)
    except Website.DoesNotExist:
        return Response({"error": "Website not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # For demo purposes, we'll generate mock data
    # In a real implementation, you'd query the database for actual analytics
    data = generate_mock_analytics(website, time_range)
    
    serializer = AnalyticsDataSerializer(data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_summary(request):
    """
    Get dashboard summary for the client's websites
    """
    # Get the client's first website for the summary
    # In a real implementation, you might want to show aggregated data for all websites
    
    if request.user.is_agency_admin:
        websites = Website.objects.all()
    else:
        websites = Website.objects.filter(owner=request.user)
    
    if not websites.exists():
        return Response({"error": "No websites found"}, status=status.HTTP_404_NOT_FOUND)
    
    website = websites.first()
    
    # For demo purposes, we'll generate mock data
    data = generate_mock_dashboard_summary(website)
    
    serializer = DashboardSummarySerializer(data)
    return Response(serializer.data)


def generate_mock_analytics(website, time_range):
    """Generate mock analytics data for demonstration purposes"""
    
    # Base numbers
    base_visitors = random.randint(100, 5000)
    base_page_views = base_visitors * random.uniform(1.5, 4.0)
    bounce_rate = random.uniform(30, 70)
    avg_session = random.randint(60, 300)  # seconds
    
    # Deltas based on time range
    if time_range == 'week':
        visitor_delta = random.uniform(-10, 20)
        page_view_delta = random.uniform(-15, 25)
        bounce_delta = random.uniform(-5, 5)
        duration_delta = random.uniform(-10, 10)
    elif time_range == 'year':
        visitor_delta = random.uniform(15, 80)
        page_view_delta = random.uniform(20, 90)
        bounce_delta = random.uniform(-15, -2)
        duration_delta = random.uniform(5, 30)
    else:  # month (default)
        visitor_delta = random.uniform(-5, 35)
        page_view_delta = random.uniform(-10, 40)
        bounce_delta = random.uniform(-10, 8)
        duration_delta = random.uniform(-5, 15)
    
    # Format deltas as strings with + or - sign
    visitor_delta_str = f"{'+' if visitor_delta >= 0 else ''}{visitor_delta:.1f}%"
    page_view_delta_str = f"{'+' if page_view_delta >= 0 else ''}{page_view_delta:.1f}%"
    bounce_delta_str = f"{'+' if bounce_delta >= 0 else ''}{bounce_delta:.1f}%"
    duration_delta_str = f"{'+' if duration_delta >= 0 else ''}{duration_delta:.1f}%"
    
    # Format average session duration
    minutes, seconds = divmod(int(avg_session), 60)
    avg_session_str = f"{minutes}:{seconds:02d}"
    
    # Generate top pages
    page_paths = [
        '/', '/about', '/services', '/portfolio', '/contact',
        '/blog', '/testimonials', '/careers', '/pricing'
    ]
    top_pages = []
    for path in random.sample(page_paths, min(5, len(page_paths))):
        page_views = int(random.uniform(0.05, 0.25) * base_page_views)
        avg_time = f"{random.randint(0, 3)}:{random.randint(10, 59)}"
        bounce = f"{random.randint(20, 80)}%"
        top_pages.append({
            "path": path,
            "views": page_views,
            "avgTime": avg_time,
            "bounceRate": bounce
        })
    
    # Sort by views descending
    top_pages.sort(key=lambda x: x['views'], reverse=True)
    
    return {
        "totalVisitors": int(base_visitors),
        "visitorsDelta": visitor_delta_str,
        "pageViews": int(base_page_views),
        "pageViewsDelta": page_view_delta_str,
        "avgSessionDuration": avg_session_str,
        "sessionDurationDelta": duration_delta_str,
        "bounceRate": f"{bounce_rate:.1f}%",
        "bounceRateDelta": bounce_delta_str,
        "topPages": top_pages,
        "timeRange": time_range
    }


def generate_mock_dashboard_summary(website):
    """Generate mock dashboard summary data for demonstration purposes"""
    
    visitors = random.randint(50, 500)
    page_views = visitors * random.uniform(2.0, 5.0)
    avg_time = f"{random.randint(1, 5)}:{random.randint(10, 59)}"
    bounce_rate = f"{random.randint(30, 70)}%"
    
    # Generate recent activity
    activity_types = ['update', 'visitor', 'system']
    activity_descriptions = [
        "Homepage content updated",
        "New visitor from Google search",
        "Website backup completed",
        "Contact form submission received",
        "Blog post published",
        "Image gallery updated",
        "Testimonial section edited",
        "New visitor from social media",
        "SSL certificate renewed",
        "Mobile menu layout updated"
    ]
    
    recent_activities = []
    for i in range(5):
        activity_type = random.choice(activity_types)
        activity_desc = random.choice(activity_descriptions)
        
        # Create a random date within the last week
        days_ago = random.randint(0, 7)
        activity_date = timezone.now() - datetime.timedelta(days=days_ago)
        
        recent_activities.append({
            "id": i + 1,
            "description": activity_desc,
            "date": activity_date.strftime("%b %d, %Y %H:%M"),
            "type": activity_type
        })
    
    # Sort by date (newest first)
    recent_activities.sort(key=lambda x: datetime.datetime.strptime(x['date'], "%b %d, %Y %H:%M"), reverse=True)
    
    return {
        "websiteUrl": website.domain,
        "websiteName": website.name,
        "status": website.status,
        "visitors": visitors,
        "pageViews": int(page_views),
        "avgTime": avg_time,
        "bounceRate": bounce_rate,
        "recentActivity": recent_activities
    }