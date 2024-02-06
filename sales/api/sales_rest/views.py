from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO

# Create your views here.


#=====================================SALESPEOPLE VIEWS========================
class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'id',
        'first_name',
        'last_name',
        'employee_id'
    ]

@require_http_methods(['GET', 'POST'])
def list_salespeople(request):
    if request.method == 'GET':
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {'salespeople': salespeople},
            encoder = SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            new_employee = Salesperson.objects.create(**content)
            return JsonResponse(
                new_employee,
                encoder=SalespersonEncoder,
                safe=False
            )
        except:
            response = JsonResponse({'message': 'Could not create salesperson'})
            response.status_code = 400
            return response




#=====================================CUSTOMER VIEWS===========================
class CustomerEncoder(ModelEncoder):
    model= Customer
    properties = [
        'id',
        'first_name',
        'last_name',
        'address',
        'phone'
    ]

@require_http_methods(['GET', 'POST'])
def list_customers(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        return JsonResponse(
            {'customers': customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content= json.loads(request.body)
            new_customer = Customer.objects.create(**content)
            return JsonResponse(
                new_customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            response = JsonResponse({'message':'could not create customer'})
            response.status_code = 400
            return response


#=====================================VEHICLE SALES VIEWS======================
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties =[
        'vin',
        'sold'
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties =[
        'id',
        'price',
        'automobile',
        'salesperson',
        'customer',
    ]
    encoders = {
        'automobile': AutomobileVOEncoder(),
        'salesperson': SalespersonEncoder(),
        'customer': CustomerEncoder()
    }


@require_http_methods(['GET', 'POST'])
def list_sales(request):
    if request.method == 'GET':
        print(Sale.objects.all)
        #*****************************************************************
        #sold_vehicles isn't working quite right. come back to the filter 
        sold_vehicles = Sale.objects.filter(automobile__sold=True)
        #*****************************************************************
        return JsonResponse(
            {'sold_vehicles': sold_vehicles},
            encoder= SaleEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            new_sale = Sale.objects.create(**content)
            return JsonResponse(
                new_sale,
                encoder=SaleEncoder,
                safe=False
            )
        except:
            response = JsonResponse({'message':'could not create sale'})
            response.status_code = 400
            return response

