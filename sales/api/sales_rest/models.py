from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin= models.CharField(max_length= 17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length = 20)
    last_name = models.CharField(max_length = 55)
    employee_id = models.CharField(max_length = 10)

class Customer(models.Model):
    first_name = models.CharField(max_length = 20)
    last_name = models.CharField(max_length = 55)
    address = models.CharField(max_length = 150)
    phone = models.PositiveIntegerField()


class Sale(models.Model):
    price = models.PositiveSmallIntegerField()
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
    
