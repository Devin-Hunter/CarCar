from django.db import models
from django.urls import reverse

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50, unique=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Appointment(models.Model):

    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(
        max_length=100,
        default="Scheduled")
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_appointments", kwargs={"pk": self.id})

    class Meta:
        ordering = ("date_time",) #ordering appointments by date & time

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)
    year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)


    def __str__(self):
        return f"{self.vin}"
