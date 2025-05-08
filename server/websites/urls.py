# server/websites/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import WebsiteViewSet, WebsiteSectionViewSet

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'websites', WebsiteViewSet, basename='website')

# Create a nested router for sections
websites_router = routers.NestedSimpleRouter(router, r'websites', lookup='website')
websites_router.register(r'sections', WebsiteSectionViewSet, basename='website-sections')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(websites_router.urls)),
]