from django.contrib import admin
from .models import *

class EventAdmin(admin.ModelAdmin):
	view_on_site = True
	list_display = ('title', 'date' )
	search_fields = ['date', 'title']
	ordering = ['date']

admin.site.register(Event, EventAdmin)
admin.site.register(Partner)
admin.site.register(Member)
admin.site.register(Project)