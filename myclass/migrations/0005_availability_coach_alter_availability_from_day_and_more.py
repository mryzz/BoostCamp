# Generated by Django 4.2.9 on 2024-01-30 22:56

from django.db import migrations, models
import django.db.models.deletion
import myclass.models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_profile_profile_picture_and_more'),
        ('myclass', '0004_alter_availability_options_myclass_open_for_booking'),
    ]

    operations = [
        migrations.AddField(
            model_name='availability',
            name='coach',
            field=models.ForeignKey(default=myclass.models.default_coach, on_delete=django.db.models.deletion.CASCADE, related_name='availabilities', to='accounts.profile'),
        ),
        migrations.AlterField(
            model_name='availability',
            name='from_day',
            field=models.CharField(choices=[('Mon', 'Monday'), ('Tue', 'Tuesday'), ('Wed', 'Wednesday'), ('Thu', 'Thursday'), ('Fri', 'Friday'), ('Sat', 'Saturday'), ('Sun', 'Sunday')], max_length=3),
        ),
        migrations.AlterField(
            model_name='availability',
            name='to_day',
            field=models.CharField(choices=[('Mon', 'Monday'), ('Tue', 'Tuesday'), ('Wed', 'Wednesday'), ('Thu', 'Thursday'), ('Fri', 'Friday'), ('Sat', 'Saturday'), ('Sun', 'Sunday')], max_length=3),
        ),
    ]
