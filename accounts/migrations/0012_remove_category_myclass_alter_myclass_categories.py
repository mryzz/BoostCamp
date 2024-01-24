# Generated by Django 4.2.9 on 2024-01-23 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_alter_category_myclass_alter_myclass_categories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='myclass',
        ),
        migrations.AlterField(
            model_name='myclass',
            name='categories',
            field=models.ManyToManyField(related_name='classes', to='accounts.category'),
        ),
    ]