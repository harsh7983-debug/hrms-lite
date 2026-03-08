from django.urls import path
from .views import EmployeeListCreateView, EmployeeDeleteView

urlpatterns = [
    path('', EmployeeListCreateView.as_view()),
    path('<int:pk>/', EmployeeDeleteView.as_view()),
]