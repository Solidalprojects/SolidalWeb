# server/analytics/urls.py
from django.urls import path
from .views import analytics_data, dashboard_summary

urlpatterns = [
    path('analytics/data/', analytics_data, name='analytics_data'),
    path('dashboard/summary/', dashboard_summary, name='dashboard_summary'),
]