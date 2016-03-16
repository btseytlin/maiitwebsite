# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0005_auto_20151104_2114'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ['-date']},
        ),
        migrations.AlterModelOptions(
            name='member',
            options={'ordering': ['created_date']},
        ),
        migrations.AlterModelOptions(
            name='partner',
            options={'ordering': ['created_date']},
        ),
        migrations.AlterModelOptions(
            name='project',
            options={'ordering': ['created_date']},
        ),
        migrations.AddField(
            model_name='partner',
            name='url',
            field=models.CharField(default='', max_length=300, blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='partner',
            name='description',
            field=models.CharField(default='', max_length=100, blank=True, null=True),
        ),
    ]
