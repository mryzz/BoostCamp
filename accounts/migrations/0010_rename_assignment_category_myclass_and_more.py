# Generated by Django 4.2.9 on 2024-01-23 23:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_myclass_alter_category_assignment_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='assignment',
            new_name='myclass',
        ),
        migrations.RenameField(
            model_name='comment',
            old_name='assignment',
            new_name='myclass',
        ),
    ]
