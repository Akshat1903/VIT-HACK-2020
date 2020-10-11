from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

import pandas as pd
import random
import json
from datetime import *


# Create your views here.

FILENAME = './api/final_data_deceased.csv'
df = pd.read_csv(FILENAME)
df = df.fillna('')

dates = list(set(df['reportedOn']))
new_dates = []
for date_sort in dates:
	d1, m1, y1 = [int(x) for x in date_sort.split('/')]
	b1 = date(y1,m1,d1)
	new_dates.append(b1)
new_dates.sort()
new_dates_2 = [str(x) for x in new_dates]
dates = []
for date_sort_2 in new_dates_2:
	y1, m1, d1 = [x for x in date_sort_2.split('-')]
	dates.append(str(d1)+'/'+str(m1)+'/'+str(y1))


def filterprod(Data, State, Gender, Age, From_date, To_date):
	dt_st = []

	if Data == '':
		FILENAME = './api/final_data_compiled.csv'
	else:
		FILENAME = './api/' + str(Data)
	df = pd.read_csv(FILENAME)
	df = df.fillna('')

	dates = list(set(df['reportedOn']))
	new_dates = []
	for date_sort in dates:
		d1, m1, y1 = [int(x) for x in date_sort.split('/')]
		b1 = date(y1,m1,d1)
		new_dates.append(b1)
	new_dates.sort()
	new_dates_2 = [str(x) for x in new_dates]
	dates = []
	for date_sort_2 in new_dates_2:
		y1, m1, d1 = [x for x in date_sort_2.split('-')]
		dates.append(str(d1)+'/'+str(m1)+'/'+str(y1))

	for date1 in dates:
		if From_date != '':
			y1, m1, d1 = [int(x) for x in str(From_date).split('-')]
			b1 = date(y1,m1,d1)
			d2, m2, y2 = [int(x) for x in str(date1).split('/')]
			b2 = date(y2, m2, d2)
			if b1>b2:
				continue
		if To_date != '':
			y1, m1, d1 = [int(x) for x in To_date.split('-')]
			b1 = date(y1, m1, d1)
			d2, m2, y2 = [int(x) for x in date1.split('/')]
			b2 = date(y2, m2, d2)
			if b1<b2:
				continue
		df1 = df[df['reportedOn'] == date1]
		if State != '':
			df1 = df1[df1['state']==State]
		if Gender != '':
			df1=df1[df1['gender']==Gender]
		if Age != '':
			if Age == 7:
				df1=df1[float((Age*10)) <= df1['ageEstimate']]
			else:
				df1=df1[float((Age*10)) <= df1['ageEstimate']]
				df1=df1[df1['ageEstimate'] <= float(((Age+1)*10)-1)]

		count = len(df1.index)
		dict = {
			'date': date1,
			'count': count
		}
		dt_st.append(dict)
	return dt_st

@api_view(['GET','POST'])
def apiOverview(request):
	if request.method == "POST":
		queries = json.loads(request.body)
		print(queries)
		if(queries['age'] == ''):
			new_data = filterprod(queries['data'],queries['state'],queries['gender'],queries['age'],queries['from_date'],queries['to_date'])
		else:
			new_data = filterprod(queries['data'],queries['state'],queries['gender'],int(queries['age']),queries['from_date'],queries['to_date'])
		return Response(new_data)

def contact_view(request):
	return render(request,'task_1.html',{})

def home_page(request):
	return render(request,'task_2.html',{})

def hospitals(request):
	return render(request,'task3_a.html',{})

def colleges(request):
	return render(request,'task3_b.html',{})

def charts(request):
	return render(request,'charts.html',{})
