from django.contrib import admin
from .models import uploadedFile

@admin.register(uploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
	list_display = ("id", "fileName", "file", "user")
	search_fields = ("fileName", "user__username")
	list_filter = ("user",)
