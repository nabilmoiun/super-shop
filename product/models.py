from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Product(models.Model):
    UNITS = (
        ('Kg', 'Kg'),
        ('Litre', 'Litre'),
        ('Piece', 'Piece'),
    )
    name = models.CharField(max_length=250)
    code = models.CharField(max_length=150)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    price = models.FloatField()
    stock = models.FloatField()
    unit = models.CharField(max_length=10, choices=UNITS)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


