from django.db import models
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.template.defaultfilters import slugify


class Event(models.Model):
	created_date = models.DateTimeField(auto_now_add=True) 
	title = models.CharField(max_length=250, default="") 
	description = models.TextField(max_length=1500, default="")
	slug = models.SlugField(max_length=100)
	image = models.ImageField(null=True)
	date = models.DateTimeField()

	class Meta: 
		ordering = ['date']

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.title)
		super(Event, self).save(*args, **kwargs)

MODEL_TYPES = (
		('reg','Regular'),
		('org', 'Organizer'),
		('hon', 'Honorary'),
	)

class Member(models.Model):
	created_date = models.DateTimeField(auto_now_add=True) 
	member_type = models.ChatField(max_length=3, default='reg', choices=MODEL_TYPES)
	name = models.CharField(max_length=300, default="")
	description = models.CharField(max_length=300, default="", null=True)
	image = models.ImageField()

class Project(models.Model):
	created_date = models.DateTimeField(auto_now_add=True) 
	title = models.CharField(max_length=300, default="")
	description = models.CharField(max_length=300, default="", null=True)
	image = models.ImageField()

class Partner(models.Model):
	created_date = models.DateTimeField(auto_now_add=True) 
	name = models.CharField(max_length=300, default="")
	description = models.CharField(max_length=300, default="", null=True)
	image = models.ImageField()

