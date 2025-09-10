from django.urls import path
from . import views

urlpatterns = [
    path('calendars/', views.list_calendars, name='list_calendars'),
    path('appointments/create/', views.create_appointment, name='create_appointment'),
]
