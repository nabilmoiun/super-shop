Super Shop Management
======================

This is a simple ***super shop management system*** where you can manage products with different categories and create
order by providing customer information. After the successful order, an invoice is generated in pdf format with a QR
code that contains customer information and the all the necessary information is stored in the database too.

Technologies Used
==================

+ Django
+ Html, Css
+ Bootstrap
+ Javascript
+ SQLite

Features
===============

+ Product management(CRUD)
+ Category management(CRUD)
+ Order creation for customers
+ Invoice creation in pdf format
+ Qr code generation containing customer information in the invoice

Deployment
=============

The app is deployed on heroku. You can view the system running live on this link [View Project Live] (https://super-shop-nabil.herokuapp.com/)

Running Locally
===================

Please follow through the instructions below to run/execute the project locally on your machine.
***You must have python installed with version >= 3.8.3 to run this application***

So first of all, clone this repository and go the root directory of the project by following commands

    $ git clone git@github.com:nabilmoiun/super-shop.git
    $ cd super-shop

I would recommend you to work on a virtual environment. I have used ***virtualenv*** package. So install this first by
the following command

    $ pip install virtualenv

Now, create a new virtual environment and install the necessary packages provided in the requirements.txt file by following
the below commands:

Creating new virtual environment

    $ virtualenv environment_name
Activating the virtual environment

    $ source environment_name/bin/activate # on Linux
    $ source environment_name/Scripts/activate # on Windows
    
If you face problem activating the virtual environment in windows by the given commands, then activate it by the following
procedure.
Go to environment_name/Scripts and type activate. The environment will hopefully be activated. Then you have go the your
project root directory again. Follow the below steps to achieve this:

    $ cd environment_name/Scripts
    $ activate
    $ cd ../../

If you still find problem activating virtualenv. Please follow this [blog] (https://programwithus.com/learn/python/pip-virtualenv-windows)
    
Installing the required packages from the requirements.txt file

    $ pip install -r requirements.txt

Finally you have to run the database migrations to get the app started. So follow the below commands to run migrations
    
    $ python manage.py makemigrations
    $ python manage.py migrate
    $ python manage.py runserver
    
Now open the browser and go to ***localhost/8000*** to see the app running with the following page below:

You can add new category and its products and then create order for the customers.

Remarks
================

As the customer information is encoded in Qr code with a pdf invoice. You can also find the customer information stored
in the database manually. To do that you must create a super user for the application. To do that, stop the django server pressing
ctrl+c and type the following commands:

    $ python manage.py createsuperuser --username your_username --email your_email
    
It will ask for the password. Enter your password and confirm it then the super user will be created. After that run the
server again by:

    $ python manage.py runserver

You can now see the default django admin panel by going to the link ***localhost:8000/admin/*** enter the username and
password you created for the super user and then you can see all the tables created for the app and its data.
