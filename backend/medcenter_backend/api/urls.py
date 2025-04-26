from .views import TreatmentDetailView, TreatmentCreateView, patient_me_view, doctor_conditions_view, LogoutView, DoctorDetailView, DoctorTreatmentListView, PatientConditionListView, PatientTreatmentListView, doctor_profile_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

urlpatterns = [
    path('token/', TokenObtainPairView.as_view()),                #Authentication
    path('token/refresh/', TokenRefreshView.as_view()),          
    path('logout/', LogoutView.as_view()),  


 
    path('me/', patient_me_view),                                 #Patient
    path('me/conditions/', PatientConditionListView.as_view()),  
    path('me/treatments/', PatientTreatmentListView.as_view()), 
    path('doctors/<int:pk>/', DoctorDetailView.as_view()),



    path('doctor/profile/', doctor_profile_view),                 #Doctor    
    path('doctor/conditions/', doctor_conditions_view),     
    path('doctor/treatments/', DoctorTreatmentListView.as_view()),  

    path('treatments/<int:pk>/', TreatmentDetailView.as_view()),  #Treatments CRUD for Doctors
    path('treatments/', TreatmentCreateView.as_view()),
    


]