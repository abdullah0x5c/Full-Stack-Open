from django.contrib import admin
from .models import KeyBuffer

@admin.register(KeyBuffer)
class KeyBufferAdmin(admin.ModelAdmin):
	list_display = ("id", "key")
	search_fields = ("key",)

