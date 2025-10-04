from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import KeyBuffer
from .serializers import KeyBufferSerializer

# Create your views here.

class KeyBufferView(APIView):
	def get(self, request):
		kb = KeyBuffer.objects.first()
		if kb:
			serializer = KeyBufferSerializer(kb)
			return Response(serializer.data)
		return Response({"error": "No key-buffer stored"}, status=404)

	def post(self, request):
		KeyBuffer.objects.all().delete()
		serializer = KeyBufferSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=201)
		return Response(serializer.errors, status=400)
