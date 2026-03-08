from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from employees.models import Employee
from .models import Attendance
from .serializers import AttendanceSerializer


class AttendanceCreateView(generics.CreateAPIView):
    """
    POST -> Create attendance record
    """
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class AttendanceListView(generics.ListAPIView):
    """
    GET -> List attendance records
    Optional filters:
        ?employee_id=EMP001
        ?date=2026-03-01
    """
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        employee_id = self.request.query_params.get("employee_id")
        date = self.request.query_params.get("date")

        queryset = Attendance.objects.all().order_by("-date")

        if employee_id:
            queryset = queryset.filter(employee__employee_id=employee_id)

        if date:
            queryset = queryset.filter(date=date)

        return queryset


class DashboardSummaryView(APIView):
    """
    GET -> Dashboard summary data
    """

    def get(self, request):
        today = now().date()

        total_employees = Employee.objects.count()

        present_today = Attendance.objects.filter(
            date=today,
            status="Present"
        ).count()

        absent_today = Attendance.objects.filter(
            date=today,
            status="Absent"
        ).count()

        return Response({
            "total_employees": total_employees,
            "present_today": present_today,
            "absent_today": absent_today
        })