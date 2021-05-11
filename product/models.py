from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator


class Category(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        return super(Category, self).save(*args, **kwargs)


class Product(models.Model):
    UNITS = (
        ('Kg', 'Kg'),
        ('Litre', 'Litre'),
        ('Piece', 'Piece'),
    )
    name = models.CharField(max_length=250)
    code = models.CharField(max_length=150)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    price = models.FloatField(validators=[MinValueValidator(1.0)])
    stock = models.FloatField(validators=[MinValueValidator(0.0)])
    unit = models.CharField(max_length=10, choices=UNITS)
    slug = models.SlugField(null=True, blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        return super(Product, self).save(*args, **kwargs)



