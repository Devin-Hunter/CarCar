import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def get_autos():
    response = requests.get('http://inventory-api:8000/api/automobiles/')
    content = json.loads(response.content)
    autos = content['autos']
    vos= AutomobileVO.objects.all()
    print(vos)
    for auto in autos:
        AutomobileVO.objects.update_or_create(
            vin = auto['vin'],
            defaults={'sold': auto['sold']}
        )
    


def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            get_autos()
            
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
