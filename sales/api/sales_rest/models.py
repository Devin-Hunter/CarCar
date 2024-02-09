from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class AutomobileVO(models.Model):
    vin= models.CharField(max_length= 17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length = 20)
    last_name = models.CharField(max_length = 55)
    employee_id = models.CharField(max_length = 10, unique= True)

class Customer(models.Model):
    first_name = models.CharField(max_length = 20)
    last_name = models.CharField(max_length = 55)
    address = models.CharField(max_length = 150)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,10}$', message="Phone number must be entered in the format: '+999999999'. Up to 10 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=10)


class Sale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name= 'sale',
        on_delete = models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name= 'sale',
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name= 'sale',
        on_delete = models.CASCADE,
    )
    
