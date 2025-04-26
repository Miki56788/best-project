from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    sex = models.CharField(max_length=50)
    anamnesis = models.TextField()
    birth_date = models.DateField()
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    email = models.EmailField()
    years_of_experience = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.specialization})"


class Condition(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    diagnosed_at = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.patient.name}"


class Treatment(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    prescribed_at = models.DateField()
    condition = models.ForeignKey(Condition, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.name} for {self.condition.name}"
