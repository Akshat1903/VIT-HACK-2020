<span align="center">
<h1>VIT-HACK-2020</h1>
<h3>Covinfo - Healthcare theme</h3>
</span>

# Covinfo
Our Project is a one stop for getting all the information about the Ongoing Pandemic COVID-19. We have made a made a minimalistic User Interface with
many the features like the Latest Notifications and Updates, The total number of beds in urban and rural areas along with the state wise analysis of the same.
We will also be having the information of the number of admissions and the number of beds in each of the medical colleges. We have included the Statistics
in the form of charts to provide users, the ease of visualizing the relevant data. It would be showing the Number of Deceased Cases for any of the filtering
options we provide. We have also included the Contact Information of each of the states. We have fetched the APIs and printed the data in a sortable format giving the
user to filter according to his need and further we have also trained the provided data to predict the missing values in it and then plotted the final comparison
graph.
For data scientists, handling missing data is an important part of the data cleaning and model development process. Often times, real data contains
multiple sparse fields or fields that are laden with bad values. In this program, we have built models that can be used to impute missing or bad values in data.
When the data set is analysed we face with a problem of missing data in ageEstimate and redundant data in various labels which may impact our
processing of the data.
Pre-processing is done to sort out the data by removing the redundant data and performing encoding on the categorical data to establish a metrics from where
we can decide on a filter which we can use it to predict the missing data. After the data is processed we correlate the data against each other to find
similarity.
First let’s consider building a model that imputes missing ‘ageEstimate’ values using the ‘status’. To start, let’s correlate between ‘ageEstimate’ and ‘status’. We
see that there is a weak correlation. Let’s build a linear regression model that uses ‘status’ to predict the ‘ageEstimate’. First, let’s import the ‘Linear
Regression’ module from ‘scikit-learn’. Now let’s evaluate the performance of our model. Let’s use mean squared error to evaluate the performance of our model. 
For comparison purposes we use various other models like Random Forests Regression, but in this scenario we had best possible predictions with Linear
Regression.
#### The process goes thus:
Call the variable where you have missing values as y.
Split data into sets with missing values and without missing values, name the
missing set X_text and the one without missing values X_train and take y
(variable or feature where there is missing values) off the second set, naming it
y_train.
Use one of classification methods to predict y_pred.
Add it to X_test as your y_test column. Then combine sets together.
Further improvements can be done on this like hyperparameter tuning, and
using a deep learning based network model which is explicitly designed for this.

## Tech Stack Used

### WEB DEVELOPMENT
- HTML
- CSS
- JAVASCRIPT
- JQERY
- DJANGO REST FRAMEWORK

### MACHINE LEARNING
- Linear Regression Model
- Random Forests Model
- Pandas Pipeline

## Instructions to run the project

To run the project please install the following libraries
- Django (pip install django)
- Django-Rest-Framework (pip install djangorestframework)
- Pandas (pip install pandas)
- Run using the following command on command line:
     python manage.py runserver

## Hosted Link:
http://akshatgupta1903.pythonanywhere.com/api/

## Credits
- Team Name: index.html
- Saksham Madan
- Yogeswari Sahu
- Shubh Naresh Gupta
- Akshat Gupta

