# server/accounts/urls.py
from django.urls import path
from .views import (
    CustomAuthToken, LogoutView, RegisterView, CurrentUserView, UserSettingsView
)

urlpatterns = [
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('user/', CurrentUserView.as_view(), name='current_user'),
    path('user/settings/', UserSettingsView.as_view(), name='user_settings'),
]
