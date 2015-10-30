from django.shortcuts import render, render_to_response 
from models import *
import utils


def index(request):
	template_name = 'index.html'

	events = Event.objects.all()

	paginate_by = 10 
	page = request.GET.get('page')
	show_pages_delta = 5
	
	total_num_pages = 0
	event_list, page_range, total_num_pages = utils.paginated_list(page, paginate_by, show_pages_delta, events)
	return render_to_response(template_name, { "event_list": event_list, "page_range": page_range, "total_pages":total_num_pages }, context_instance=RequestContext(request))

def handler404(request):
	response = render_to_response('404.html', {},
		context_instance=RequestContext(request))
	response.status_code = 404
	return response


def handler500(request):
	response = render_to_response('500.html', {},
		context_instance=RequestContext(request))
	response.status_code = 500
	return response


