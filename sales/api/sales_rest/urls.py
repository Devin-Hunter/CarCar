from django.urls import path
from .views import list_salespeople, list_customers, list_sales
urlpatterns = [
    path('salespeople/', list_salespeople, name='list_salespeople'),
    path('customers/', list_customers, name='list_customers'),
    path('sales/', list_sales, name='list_sales'),
]