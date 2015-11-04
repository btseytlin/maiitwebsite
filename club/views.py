from django.views import generic
from .models import *
class PartnerView(generic.DetailView):
	model = Partner
	template_name = 'partner_detail.html'

class MemberView(generic.DetailView):
	model = Member
	template_name = 'member_detail.html'

class ProjectView(generic.DetailView):
	model = Project
	template_name = 'project_detail.html'

class EventView(generic.DetailView):
	model = Event
	template_name = 'event_detail.html'