# Generated by Django 4.2.9 on 2024-01-29 00:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myclass', '0002_availability_location_remove_myclass_categories_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myclass',
            name='location',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='myclass', to='myclass.location'),
        ),
    ]
