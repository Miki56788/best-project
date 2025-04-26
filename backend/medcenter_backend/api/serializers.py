from rest_framework import serializers
from .models import Patient, Treatment, Doctor, Condition

#ModelSerializer
class PatientSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'username', 'email', 'name', 'birth_date', 'sex', 'anamnesis', 'created_at']

class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'

#Serializer
class DoctorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    name = serializers.CharField()
    specialization = serializers.CharField()
    email = serializers.EmailField()
    years_of_experience = serializers.IntegerField()

class ConditionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField()
    diagnosed_at = serializers.DateField()
    patient = serializers.PrimaryKeyRelatedField(read_only=True)
    doctor = serializers.PrimaryKeyRelatedField(allow_null=True, read_only=True)
