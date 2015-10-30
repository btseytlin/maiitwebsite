# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(default='', max_length=250)),
                ('description', models.TextField(default='', max_length=1500)),
                ('slug', models.SlugField(max_length=100)),
                ('image', models.ImageField(upload_to='', null=True)),
                ('date', models.DateTimeField()),
            ],
            options={
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('member_type', models.CharField(default='reg', choices=[('reg', 'Regular'), ('org', 'Organizer'), ('hon', 'Honorary')], max_length=3)),
                ('name', models.CharField(default='', max_length=300)),
                ('description', models.CharField(default='', max_length=300, null=True)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Partner',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(default='', max_length=300)),
                ('description', models.CharField(default='', max_length=300, null=True)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(default='', max_length=300)),
                ('description', models.CharField(default='', max_length=300, null=True)),
                ('image', models.ImageField(upload_to='')),
            ],
        ),
    ]
