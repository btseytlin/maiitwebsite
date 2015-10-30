# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0003_auto_20151030_2123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='description',
            field=models.CharField(default='', null=True, blank=True, max_length=300),
        ),
        migrations.AlterField(
            model_name='partner',
            name='description',
            field=models.CharField(default='', null=True, blank=True, max_length=300),
        ),
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.CharField(default='', null=True, blank=True, max_length=300),
        ),
    ]
