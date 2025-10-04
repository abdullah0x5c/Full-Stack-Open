from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import FileResponse, Http404
import os 
from io import BytesIO
from django.core.files.base import ContentFile

from .models import uploadedFile
from .serializers import uploadSerializer
from .crypt import encrypt, decrypt

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

class uploadView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, req):
        if not req.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=403)
            
        newFile = req.FILES['file']
        fileBytes = newFile.read()

        encryptedFileBytes = encrypt(fileBytes)

        encryptedFile = ContentFile(encryptedFileBytes, name = newFile.name)

        saved = uploadedFile.objects.create(
            fileName = newFile.name,
            file = encryptedFile,
            user = req.user
        )  
        return Response({'message': 'File Uploaded', 'fileName' : saved.fileName})

class fileListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Show all files from all users
        files = uploadedFile.objects.all()
        serializer = uploadSerializer(files, many=True)
        return Response(serializer.data)

class fileDownloadView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        try:
            # Allow download of any file (not just user's own)
            file_record = uploadedFile.objects.get(id=id)

            fileBytes = file_record.file.read()
            decryptedFileBytes = decrypt(fileBytes)
            fileStream = BytesIO(decryptedFileBytes)

            response = FileResponse(
                fileStream,
                as_attachment=True,
                filename=file_record.fileName
            )
            response["Access-Control-Expose-Headers"] = "Content-Disposition"
            return response

        except uploadedFile.DoesNotExist:
            raise Http404("File Not Found")

class loginView(APIView):
    parser_classes = [JSONParser]
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            if not username or not password:
                return Response({'error': 'Username and password are required'}, status=400)
            
            user = authenticate(username=username, password=password)

            if(user):
                login(request, user)
                return Response({'message': 'Login successful'})
            else:
                return Response({'error': 'Invalid credentials'}, status=401)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

class registerView(APIView):
    parser_classes = [JSONParser]
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            if not username or not password:
                return Response({'error': 'Username and password are required'}, status=400)
            
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=400)
            
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
            return Response({'message': 'Registration successful'})
        except Exception as e:
            return Response({'error': str(e)}, status=500)

class logoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})

class authCheckView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'authenticated': True,
                'username': request.user.username,
                'user_id': request.user.id
            })
        else:
            return Response({
                'authenticated': False,
                'message': 'User not authenticated'
            })

class testView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({
            'message': 'Server is working!',
            'status': 'ok'
        })
