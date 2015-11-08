from club.models import *
from django.contrib.sitemaps import Sitemap
from django.core.urlresolvers import reverse
class DynamicSitemap(Sitemap):
	changfreq = 'weekly'

	def items(self):
		return list(Event.objects.all()) + list(Project.objects.all()) + list(Member.objects.all()) + list(Partner.objects.all())


	def lastmod(self, item):
		return item.created_date

class StaticSitemap(Sitemap):
	changfreq = 'never'

	def items(self):
		return ['about', 'index', 'members', 'partners', 'projects']

	def location(self, item):
		return reverse(item)