import json

from django.shortcuts import render
from django.http import JsonResponse

from product.models import Product, Category
from .models import OrderProduct, Order


def create_order(request):
    products = Product.objects.all()
    context = {
        'products': products
    }
    return render(request, 'order/create_order.html', context)


def get_product_information(request, product_id):
    product = list(Product.objects.filter(id=product_id).values())
    category = Category.objects.get(id=product[0]['category_id'])
    product[0].update({'category': category.name})
    return JsonResponse(product, safe=False)


def save_order(request):
    data = json.loads(request.body)
    customer = data[0]
    products = data[1]
    order = Order.objects.create(
            customer_name=customer['customer_name'],
            phone=customer['phone'],
            email=customer['email'], 
        )
    for p in products:
        product = Product.objects.get(id=p['product_id'])
        orderd_product = OrderProduct.objects.create(
            product=product,
            quantity=p['quantity']
        )
        product.stock -= float(p['quantity'])
        product.save()
        order.products.add(orderd_product)
        order.save()
    return JsonResponse({"message": "success", "status": 200}, safe=False)