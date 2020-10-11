from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
	path('', views.home_page, name="home_page"),
	path('charts_api', views.apiOverview, name="api-overview"),
	path('contact', views.contact_view, name="contact_view"),
	path('hospitals', views.hospitals, name="hospitals"),
	path('colleges', views.colleges, name="colleges"),
	path('charts', views.charts, name="charts"),
]
