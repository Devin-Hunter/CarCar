from django.urls import path

from .views import api_list_appointments, api_list_technicians, api_modify_appointments, api_modify_technicians

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("technicians/<int:pk>/", api_modify_technicians, name="api_modify_technicians"),
    path("appointments/<int:pk>/", api_modify_appointments, name="api_modify_appointments"),
]
