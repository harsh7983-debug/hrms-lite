from rest_framework import generics
from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeListCreateView(generics.ListCreateAPIView):
    """
    GET  -> List all employees
    POST -> Create new employee
    """
    queryset = Employee.objects.all().order_by("-created_at")
    serializer_class = EmployeeSerializer


class EmployeeDeleteView(generics.DestroyAPIView):
    """
    DELETE -> Remove employee by ID
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer