import uuid

from django.db import models


class OrderProduct(models.Model):
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class Order(models.Model):
    customer_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    products = models.ManyToManyField('OrderProduct', related_name='ordered_products')
    invoice_id = models.CharField(max_length=40, null=True, blank=True)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer_name

    def save(self, *args, **kwargs):
        self.invoice_id = uuid.uuid4().hex
        super(Order, self).save(*args, **kwargs)
