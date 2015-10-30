from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
def paginated_list(page, paginate_by, show_pages_delta, item_list):
	paginator = Paginator(item_list, paginate_by)
	page_list = []
	try:
		page_list = paginator.page(page)
		page = int(page)
	except PageNotAnInteger:
		page = 1
		page_list = paginator.page(1)
	except EmptyPage:
		page = paginator.num_pages
		page_list = paginator.page(paginator.num_pages)

	left = paginator.page_range.index(page)-show_pages_delta
	if left < 0:
		left = 0
	right = paginator.page_range.index(page)+show_pages_delta
	if right > paginator.num_pages:
		right = paginator.num_pages
	page_range = paginator.page_range[left:right]
	return page_list, page_range, paginator.num_pages 