from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.core.files.storage import default_storage
from repository.models import uploadedFile
import os
import shutil

class Command(BaseCommand):
    help = 'Clear all users and files for a fresh start'

    def add_arguments(self, parser):
        parser.add_argument(
            '--keep-superuser',
            action='store_true',
            help='Keep superuser accounts (admin users)',
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Starting data cleanup...'))
        
        # Count files before deletion
        file_count = uploadedFile.objects.count()
        self.stdout.write(f'Found {file_count} files to delete')
        
        # Delete all uploaded files from database
        uploadedFile.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {file_count} files from database'))
        
        # Delete all files from media directory
        media_dir = 'media/uploads'
        if os.path.exists(media_dir):
            try:
                shutil.rmtree(media_dir)
                self.stdout.write(self.style.SUCCESS(f'Deleted media directory: {media_dir}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error deleting media directory: {e}'))
        
        # Count users before deletion
        if options['keep_superuser']:
            # Delete only non-superuser accounts
            users_to_delete = User.objects.filter(is_superuser=False)
            user_count = users_to_delete.count()
            self.stdout.write(f'Found {user_count} non-superuser accounts to delete')
            users_to_delete.delete()
            self.stdout.write(self.style.SUCCESS(f'Deleted {user_count} non-superuser accounts'))
        else:
            # Delete all users including superusers
            user_count = User.objects.count()
            self.stdout.write(f'Found {user_count} users to delete')
            User.objects.all().delete()
            self.stdout.write(self.style.SUCCESS(f'Deleted {user_count} users'))
        
        # Reset database sequences (optional, for PostgreSQL)
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT setval(pg_get_serial_sequence('repository_uploadedfile', 'id'), 1, false);")
                cursor.execute("SELECT setval(pg_get_serial_sequence('auth_user', 'id'), 1, false);")
            self.stdout.write(self.style.SUCCESS('Reset database sequences'))
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Could not reset sequences (this is normal for SQLite): {e}'))
        
        self.stdout.write(self.style.SUCCESS('Data cleanup completed successfully!'))
        self.stdout.write(self.style.SUCCESS('Your project is now ready for a fresh start.')) 