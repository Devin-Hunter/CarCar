# CarCar

Team:

* Person 1 - Devin Matherne: Automobile Service
* Person 2 - Krystin Gonzales: Automobile Sales

## Design
CarCar is comprised of three microservices, Inventory, Service, and Sales. Service and Sales each interact with Inventory to execute their features.

How to run the project?
 - clone repository to local machine
    in terminal:
        git clone <<repository_url>>
 - build and run using Docker
    in terminal:
        docker volume create beta-data
        docker compose build
        --wait for build to complete--
        docker compose up
 - After all docker containers are running the project can be viewed on http://localhost:3000

Diagram of the Project:
project diagram: (./img/CARCAR_Project_Diagram.png)

## Inventory microservice
Models:
    Manufacturer: This defines the name of a manufacturer.

    VehicleModel: Defines the model name, a picture, and a manufacturer for each instance. The picture must be a url and the manufacturer is a foreignkey to the Manufacturer model.

    Automobile: Defines color, year, vin, sale status, and model for each instance. The vin is a unique identifier. the model is a foreign key to the VehicleModel model.

Insomnia endpoints:
    Inventory:
        GET: http://localhost:8100/api/automobiles/
        POST: http://localhost:8100/api/automobiles/
        PUT: http://localhost:8100/api/automobiles/<vin>
        DELETE: http://localhost:8100/api/automobiles/<vin>
        
<!-- 
        Post sample input:
        {
            "color":"Purple",
            "year":"2010",
            "vin":"1C3CC5FB2AN1273",
            "model_id": 1
        }
-->

    Models:
        GET: http://localhost:8100/api/models/
        POST: http://localhost:8100/api/models/
<!-- 
        POST sample input:
        {
            "name":"Mustang",
            "picture_url": "https://www.pexels.com/photo/blue-ford-mustang-in-car-park-10905506/",
            "manufacturer_id": 2
        }
-->

    Manufacturers:
        GET: http://localhost:8100/api/manufacturers/
        POST:http://localhost:8100/api/manufacturers/
<!-- 
        POST sample input:
        {
            "name": "Ford"
        }
-->


Front end paths:
    Inventory:
        List inventory: http://localhost:3000/automobiles
        Add to inventory: http://localhost:3000/automobiles/new

    Models:
        List or Add Model: http://localhost:3000/models

    Manufacturers:
        List or Add Manufacturer: http://localhost:3000/manufacturers

## Service microservice


Automobile Service Microservice:
URL:
Port: 8081 (8080 not available on my machine)

CRUD Route Documentation:
(apis?)

Identify Value Objects:
Value Objects:

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Models:
    There are 4 models for the Sales microservice:

    1. AutomobileVO: This defines how the data polled from Inventory should be represented as value objects for the sales microservice.

    2. Salesperson: This defines the data collected for each salesperson.

    3. Customer: This defines the data collected for each customer.

    4. Sale: The data for each sale instance is comprised of a price field as well as an instance of each of the other 3 models.

Insomnia endpoints:
    Salesperson:
        GET = http://localhost:8090/api/salespeople/
        POST = http://localhost:8090/api/salespeople/
        DELETE = http://localhost:8090/api/salespeople/<int:pk>/
<!-- 
        sample json for POST:
        {
            "first_name": "John",
            "last_name": "Doe",
            "employee_id": "555"
        } 
-->

    Customer:
        GET = http://localhost:8090/api/customers/
        POST = http://localhost:8090/api/customers/
        
<!-- 
        sample json for POST:
        {
            "first_name": "Marie",
            "last_name": "Curie",
            "address": "1906 Radium Ln",
            "phone_number": 1234567
        } 
-->
        

    Sale:
        GET = http://localhost:8090/api/sales/
        POST = http://localhost:8090/api/sales/

<!-- 
        {
            "automobile": "1C3CC5FB2AN1273", (vin)
            "salesperson": 111, (employee_id)
            "customer": 1, (customer id)
            "price": 8753 (integer)
        }
-->

    AutomobileVO:
        GET: http://localhost:8090/api/autoVO/

Front end paths:    
    Salespeople:
        List salespeople: http://localhost:3000/salesperson
        Create salesperon: http://localhost:3000/salesperson/new
    
    Customers:
        List customers: http://localhost:3000/customers
        Add a customer: http://localhost:3000/customers/new
    
    Sales:
        List all sales: http://localhost:3000/sales
        List sales by employee: http://localhost:3000/sales/employee
        Create a new sale: http://localhost:3000/sales/new