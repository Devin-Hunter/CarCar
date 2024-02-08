from django.contrib import admin

from .models import Technician, Appointment, AutomobileVO

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display = [
        "first_name",
        "last_name",
        "employee_id",
    ]

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = [
        "vin",
        "sold",
        "year",
        "model",
        "manufacturer",
    ]
