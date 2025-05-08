
# server/websites/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Website, WebsiteSection
from .serializers import WebsiteSerializer, WebsiteSectionSerializer
from analytics.models import ActivityLog


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners or agency admins to access the object
    """
    def has_object_permission(self, request, view, obj):
        # Check if user is the owner or is an agency admin
        return obj.owner == request.user or request.user.is_agency_admin


class WebsiteViewSet(viewsets.ModelViewSet):
    serializer_class = WebsiteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    
    def get_queryset(self):
        # If user is an agency admin, return all websites
        if self.request.user.is_agency_admin:
            return Website.objects.all()
        # Otherwise, return only the user's websites
        return Website.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        website = serializer.save(owner=self.request.user)
        # Create an activity log for website creation
        ActivityLog.objects.create(
            website=website,
            description=f"Website '{website.name}' created",
            type='system',
            user=self.request.user
        )


class WebsiteSectionViewSet(viewsets.ModelViewSet):
    serializer_class = WebsiteSectionSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    
    def get_queryset(self):
        # Get the website ID from the URL
        website_id = self.kwargs.get('website_pk')
        
        # If user is an agency admin, return all sections for the specified website
        if self.request.user.is_agency_admin:
            return WebsiteSection.objects.filter(website_id=website_id)
        
        # Otherwise, return only sections for the user's websites
        return WebsiteSection.objects.filter(
            website_id=website_id, 
            website__owner=self.request.user
        )
    
    def perform_create(self, serializer):
        # Get the website from the URL
        website_id = self.kwargs.get('website_pk')
        website = Website.objects.get(id=website_id)
        
        # Ensure the user has permission to modify this website
        if not (website.owner == self.request.user or self.request.user.is_agency_admin):
            raise permissions.PermissionDenied("You do not have permission to modify this website.")
        
        section = serializer.save(website=website)
        
        # Create an activity log for section creation
        ActivityLog.objects.create(
            website=website,
            description=f"Section '{section.name}' created",
            type='update',
            user=self.request.user
        )
    
    def perform_update(self, serializer):
        section = serializer.instance
        website = section.website
        
        # Ensure the user has permission to modify this website
        if not (website.owner == self.request.user or self.request.user.is_agency_admin):
            raise permissions.PermissionDenied("You do not have permission to modify this website.")
        
        serializer.save()
        
        # Create an activity log for section update
        ActivityLog.objects.create(
            website=website,
            description=f"Section '{section.name}' updated",
            type='update',
            user=self.request.user
        )
