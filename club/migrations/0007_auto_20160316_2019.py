# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0006_auto_20160316_2019'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partner',
            name='description',
            field=models.CharField(null=True, max_length=300, default='', blank=True),
        ),
        migrations.AlterField(
            model_name='partner',
            name='url',
            field=models.CharField(null=True, max_length=100, default='', blank=True),
        ),
    ]
