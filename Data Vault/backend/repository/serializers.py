from rest_framework import serializers
from .models import uploadedFile

class uploadSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    file_size = serializers.SerializerMethodField()
    
    def get_file_size(self, obj):
        if obj.file:
            size_bytes = obj.file.size
            # Convert to human readable format
            for unit in ['B', 'KB', 'MB', 'GB']:
                if size_bytes < 1024.0:
                    return f"{size_bytes:.1f} {unit}"
                size_bytes /= 1024.0
            return f"{size_bytes:.1f} TB"
        return "0 B"
    
    class Meta:
        model = uploadedFile
        fields = ['id', 'fileName','file_size', 'username']
        