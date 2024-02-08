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
            encoder = SalespersonEncoder
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
        
@require_http_methods(['DELETE'])
def delete_salesperson(request, pk):
    if request.method == 'DELETE':
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count >0})




#=====================================CUSTOMER VIEWS===========================
class CustomerEncoder(ModelEncoder):
    model= Customer
    properties = [
        'id',
        'first_name',
        'last_name',
        'address',
        'phone_number'
    ]

@require_http_methods(['GET', 'POST'])
def list_customers(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        return JsonResponse(
            {'customers': customers},
            encoder=CustomerEncoder
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
        'customer'
    ]
    encoders = {
        'automobile': AutomobileVOEncoder(),
        'salesperson': SalespersonEncoder(),
        'customer': CustomerEncoder()
    }


@require_http_methods(['GET', 'POST'])
def list_sales(request):
    if request.method == 'GET':
        sales = Sale.objects.all()       
        return JsonResponse(
            {'sales': sales},
            encoder= SaleEncoder
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            vehicle= AutomobileVO.objects.get(vin = content['automobile'])
            content['automobile'] = vehicle
            print(content)
        except AutomobileVO.DoesNotExist:
            response = JsonResponse({'message': 'auto does not exist'})
            response.status_code = 400
            return response
        try:
            salesperson = Salesperson.objects.get(employee_id = content['salesperson'])
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            response = JsonResponse({'message': 'salesperson does not exist'})
            response.status_code = 400
            return response
        try:
            customer = Customer.objects.get(id = content['customer'])
            content['customer'] = customer
        except Customer.DoesNotExist:
            response = JsonResponse({'message':'customer does not exist'})
            response.status_code = 400
            return response
                
        new_sale = Sale.objects.create(**content)

        
         
        return JsonResponse(
            new_sale,
            encoder=SaleEncoder,
            safe=False
        )
        

