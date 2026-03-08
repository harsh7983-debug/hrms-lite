from django.db import models
from employees.models import Employee


class Attendance(models.Model):
    STATUS_CHOICES = [
        ("Present", "Present"),
        ("Absent", "Absent"),
    ]

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="attendances",
    )

    date = models.DateField(db_index=True)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        db_index=True
    )

    class Meta:
        ordering = ["-date"]
        constraints = [
            models.UniqueConstraint(
                fields=["employee", "date"],
                name="unique_employee_attendance",
            )
        ]

    def __str__(self):
        return f"{self.employee.full_name} - {self.date} - {self.status}"