from django.db import models
from django.contrib.auth.models import User
import uuid
import os

def uploadPath(instance, filename):
    extension = os.path.splitext(filename)[1]
    filename = f"{uuid.uuid4().hex}{extension}"
    return f"uploads/{filename}"

class uploadedFile(models.Model):
    fileName = models.CharField(max_length=255)
    file = models.FileField(upload_to=uploadPath)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.fileName        