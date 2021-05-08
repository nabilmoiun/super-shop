from django import forms
from django.db.models import Q
from django.core.exceptions import ValidationError

from .models import Product, Category


class ProductForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({"class": "form-control"})
        self.fields['code'].widget.attrs.update({"class": "form-control"})
        self.fields['price'].widget.attrs.update({"class": "form-control"})
        self.fields['stock'].widget.attrs.update({"class": "form-control"})

    class Meta:
        model = Product
        fields = ('name', 'code', 'price', 'stock', )

    def clean(self):
        insert = self.instance.pk == None

        if insert:
            if 'name' in self.cleaned_data:
                product_name = Product.objects.filter(Q(name__icontains=self.cleaned_data['name']))
                if product_name.exists():
                    raise ValidationError("Product with the given name already exists")
                    
            if 'code' in self.cleaned_data:
                product_code = Product.objects.filter(Q(code__icontains=self.cleaned_data['code']))
                if product_code.exists():
                    raise ValidationError("Product with the given code already exists")
        
        else:
            if 'name' in self.cleaned_data:
                product_name = Product.objects.filter(Q(name__icontains=self.cleaned_data['name'])).exclude(id=self.instance.id)
                if product_name.exists():
                    raise ValidationError("Product with the given name already exists")
                    
            if 'code' in self.cleaned_data:
                product_code = Product.objects.filter(Q(code__icontains=self.cleaned_data['code'])).exclude(id=self.instance.id)
                if product_code.exists():
                    raise ValidationError("Product with the given code already exists")


class CategoryForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({"class": "form-control"})

    class Meta:
        model = Category
        fields = ('name', )

    def clean(self):
        insert = self.instance.pk == None

        if insert:
            if 'name' in self.cleaned_data:
                category_name = Category.objects.filter(Q(name__icontains=self.cleaned_data['name']))
                if category_name.exists():
                    raise ValidationError("Category with the given name already exists")

