# Generated by Django 3.2 on 2021-05-12 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_category_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='unit',
            field=models.CharField(choices=[('Kg', 'Kg'), ('Litre', 'Litre'), ('Piece', 'Piece'), ('Box', 'Box')], max_length=10),
        ),
    ]