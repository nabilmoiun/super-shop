from django.contrib import admin
from django.urls import path

from .views import (
    add_product, update_product, delete_product,
    product_list, add_category, update_category,
    category_list
)

urlpatterns = [
    path('add_category/', add_category, name='add_category'),
    path('update_category/<str:slug>/', update_category, name='update_category'),
    path('category_list/', category_list, name='category_list'),
    path('add_product/', add_product, name='add_product'),
    path('update_product/<str:slug>/', update_product, name='update_product'),
    path('delete_product/<int:id>/', delete_product, name='delete_product'),
    path('product_list/', product_list, name='product_list'),
]
