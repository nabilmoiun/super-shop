from django.db.models import Q
from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect

from .models import Category, Product
from .forms import ProductForm, CategoryForm

def add_category(request):
    form = CategoryForm()
    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Category added")
            return redirect('category_list')
    context = {
        'form': form,
    }
    return render(request, 'product/add_category.html', context)


def update_category(request, slug):
    category = get_object_or_404(Category, slug=slug)
    if request.method == "POST":
        form = CategoryForm(request.POST, instance=category)
        if form.is_valid():
            category_name = Category.objects.filter(
                Q(name__icontains=request.POST['name'])).exclude(id=category.id)
            if category_name.exists():
                messages.warning(request, 'Category with the given name already exists')
                return redirect('category_list')
            category.name = request.POST['name']
            category.save()
            messages.success(request, "Category updated")
            return redirect('category_list')
    categories = Category.objects.all()
    context = {
        'categories': categories,
    }
    return render(request, 'product/category_list.html', context)


def category_list(request):
    categories = Category.objects.order_by('-id')
    form = CategoryForm()
    context = {
        'categories': categories,
        'form': form
    }
    return render(request, 'product/category_list.html', context)


def add_product(request):
    form = ProductForm()
    categories = Category.objects.all()
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            if 'category' not in request.POST:
                messages.warning(request, "Product must have a category")
                return redirect('add_product')
            product = form.save(commit=False)
            product.category = Category.objects.get(id=request.POST['category'])
            product.unit = request.POST['unit']
            product.save()
            messages.success(request, "Product has benn added")
            return redirect('product_list')
    context = {
        'form': form,
        'categories': categories
    }
    return render(request, 'product/add_product.html', context)


def update_product(request, slug):
    product = get_object_or_404(Product, slug=slug)
    categories = Category.objects.all()
    form = ProductForm(instance=product)
    if request.method == "POST":
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            if 'category' not in request.POST:
                messages.warning(request, "Product must have a category")
                return redirect('add_product')
            product = form.save(commit=False)
            product.category = Category.objects.get(id=request.POST['category'])
            product.unit = request.POST['unit']
            product.save()
            messages.success(request, "Product has benn updated")
            return redirect('update_product', slug=product.slug)
    context = {
        'form': form,
        'product': product,
        'categories': categories
    }
    return render(request, 'product/update_product.html', context)


def delete_product(request, id):
    product = get_object_or_404(Product, id=id)
    product.delete()
    messages.success(request, 'Product has been deleteted')
    return redirect('product_list')


def product_list(request):
    products = Product.objects.all()
    context = {
        'products': products
    }
    return render(request, 'product/product_list.html', context)


def search_products(request, search_key):
    products = list(Product.objects.filter(
        Q(name__icontains=search_key) |
        Q(code__icontains=search_key) |
        Q(category__name__icontains=search_key)
    ).values())
    return JsonResponse(products, safe=False)
