from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from .models import Doctor, Treatment, Patient, Condition
from .serializers import DoctorSerializer, PatientSerializer, ConditionSerializer, TreatmentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful"})
        except Exception:
            return Response({"error": "Invalid or missing refresh token"}, status=400)


##### PATIENT USER VIEWS #####
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def patient_me_view(request):
    if not hasattr(request.user, 'patient'):
        return Response({'detail': 'Not a patient account'}, status=403)

    serializer = PatientSerializer(request.user.patient)
    return Response(serializer.data)

class DoctorDetailView(RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class PatientConditionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, 'patient'):
            return Response({'detail': 'Not a patient account'}, status=403)
        conditions = Condition.objects.filter(patient=request.user.patient)
        serializer = ConditionSerializer(conditions, many=True)
        return Response(serializer.data)

class PatientTreatmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, 'patient'):
            return Response({'detail': 'Not a patient account'}, status=403)

        treatments = Treatment.objects.filter(condition__patient=request.user.patient)
        serializer = TreatmentSerializer(treatments, many=True)
        return Response(serializer.data)

##### DOCTOR USER VIEWS #####

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def doctor_profile_view(request):
    if not hasattr(request.user, 'doctor'):
        return Response({'detail': 'Not a doctor account'}, status=403)
    
    serializer = DoctorSerializer(request.user.doctor)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def doctor_conditions_view(request):
    if not hasattr(request.user, 'doctor'):
        return Response({'detail': 'Not a doctor account'}, status=403)

    conditions = Condition.objects.filter(doctor=request.user.doctor)
    serializer = ConditionSerializer(conditions, many=True)
    return Response(serializer.data)

class TreatmentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not hasattr(request.user, 'doctor'):
            return Response({'detail': 'Not a doctor account'}, status=403)

        serializer = TreatmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(doctor=request.user.doctor)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class TreatmentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            treatment = Treatment.objects.get(pk=pk)
        except Treatment.DoesNotExist:
            return Response({'detail': 'Not found'}, status=404)

        serializer = TreatmentSerializer(treatment)
        return Response(serializer.data)

    def put(self, request, pk):
        if not hasattr(request.user, 'doctor'):
            return Response({'detail': 'Not a doctor account'}, status=403)

        try:
            treatment = Treatment.objects.get(pk=pk, doctor=request.user.doctor)
        except Treatment.DoesNotExist:
            return Response({'detail': 'Not found'}, status=404)

        serializer = TreatmentSerializer(treatment, data=request.data)
        if serializer.is_valid():
            serializer.save(doctor=request.user.doctor)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        if not hasattr(request.user, 'doctor'):
            return Response({'detail': 'Not a doctor account'}, status=403)

        try:
            treatment = Treatment.objects.get(pk=pk, doctor=request.user.doctor)
        except Treatment.DoesNotExist:
            return Response({'detail': 'Not found'}, status=404)

        treatment.delete()
        return Response(status=204)

class DoctorTreatmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not hasattr(request.user, 'doctor'):
            return Response({'detail': 'Not a doctor account'}, status=403)

        treatments = Treatment.objects.filter(doctor=request.user.doctor)
        serializer = TreatmentSerializer(treatments, many=True)
        return Response(serializer.data)