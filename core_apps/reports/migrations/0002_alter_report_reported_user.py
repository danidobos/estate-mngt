# Generated by Django 4.2.11 on 2024-11-12 15:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("reports", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="report",
            name="reported_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reports_received",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Reported user",
            ),
        ),
    ]
