from django.contrib import admin
from .models import Patient, Doctor, Condition, Treatment

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Condition)
admin.site.register(Treatment)
# Register your models here.
