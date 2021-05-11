import json

from django.template.loader import get_template
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404

from .models import OrderProduct, Order
from product.models import Product, Category

from xhtml2pdf import pisa
from qr_code.qrcode.utils import ContactDetail


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
    response = list(Order.objects.filter(id=order.id).values())
    return JsonResponse(response[0], safe=False)


def total_orders(request):
    orders = Order.objects.order_by('-order_date')
    context = {
        'orders': orders
    }
    return render(request, 'order/total_orders.html', context)


def order_details(request, invoice_id):
    order = get_object_or_404(Order, invoice_id=invoice_id)
    template_path = 'order/order_details.html'
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'filename="report.pdf"'
    template = get_template(template_path)
    customer_information = ContactDetail(
        first_name=order.customer_name,
        last_name='',
        tel=order.phone,
        email=order.email
    )
    qr_code_string = f"customer name: {order.customer_name}\nphone:  {order.phone}\nemail: {order.email}"
    context = {
        'order': order,
        'qr_code_string': qr_code_string,
        'customer_information': customer_information
    }
    html = template.render(context)
    pisa_status = pisa.CreatePDF(
       html, dest=response)
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response