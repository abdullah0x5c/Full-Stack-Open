from rest_framework import serializers
from .models import KeyBuffer

class KeyBufferSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyBuffer
        fields = ['key', 'buffer'] 