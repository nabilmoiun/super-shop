from django.contrib import admin
from django.urls import path

from .views import create_order, get_product_information, save_order, order_details

urlpatterns = [
    path('create_order/', create_order, name='create_order'),
    path('get_product_information/<int:product_id>/', get_product_information, name='get_product_information'),
    path('save_order/', save_order, name='save_order'),
    path('order_details/<int:order_id>/', order_details, name='order_details'),
]
