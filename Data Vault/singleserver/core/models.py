from django.db import models

class KeyBuffer(models.Model):
    key = models.CharField(max_length=100, unique=True)
    buffer = models.TextField()
