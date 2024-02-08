from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "year",
        "model",
        "manufacturer",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    """
    Collection of RESTful API handler for Techician objects.

    GET:
    Returns a dictionary with a single key "technicians" which is a list of
    techicians and their details.

    POST:
    Creates a new techician and returns their details

    DELETE:
    Deletes the specified technician
    """
    if request.method == "GET":
        techs = Technician.objects.all()

        return JsonResponse(
            {"techs": techs},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:   #POST (create new technician)
        content = json.loads(request.body)


        tech = Technician.objects.create(**content)
        return JsonResponse(
            {"tech": tech},
            encoder=TechnicianEncoder,
            safe=False
        )



@require_http_methods(["DELETE", "PUT"])
def api_modify_technicians(request, pk):
    """
    Collection of RESTful API handler for Technician objects.

    DELETE:
    Deletes the specified technician

    PUT:
    Edits the selected technician

    """
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:   #PUT(edit/update)
        pass




@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    """
    Collection of RESTful API handler for Appointment objects.

    GET:
    Returns a dictionary with a single key "appointment" which is a list of
    appointments and the appointment details.

    POST:
    Creates a new appointment and returns its details. Uses the employee ID to
    identify which technician is assigned to each appointment.

    """
    if request.method == "GET":
        appointment = Appointment.objects.all()

        return JsonResponse(
            {"appointments": appointment},
            encoder=AppointmentEncoder,
            safe=False
        )


    else:   #POST (create new appointment)
        content = json.loads(request.body)

        try:
            employee = content["technician"]
            tech = Technician.objects.get(employee_id=employee)
            #can't use first/last name unless I split the string for technician.
            #use employee id instead, and have the front end take care of how it's displayed

            content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Employee ID"},
                status=400
            )

        appointment = Appointment.objects.create(**content)

        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
            safe=False
        )



@require_http_methods(["DELETE", "PUT"])
def api_modify_appointments(request, pk):
    """
    Collection of RESTful API handler for Appointment objects.

    DELETE:
    Deletes the specified appointment

    PUT:
    Edits the selected appointment

    """
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:   #PUT(edit/update)
        content = json.loads(request.body)
        try:
            if "technician" in content:
                tech = Technician.objects.get(employee_id=content["technician"])
                content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician"},
                status=400,
            )
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
