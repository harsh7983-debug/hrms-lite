from django.urls import path
from .views import AttendanceCreateView, AttendanceListView, DashboardSummaryView

urlpatterns = [
    path('', AttendanceCreateView.as_view()),
    path('list/', AttendanceListView.as_view()),
    path('dashboard/', DashboardSummaryView.as_view()),
]