from django.urls import path
from .views import uploadView, fileListView, fileDownloadView, loginView, logoutView, registerView, authCheckView, testView

urlpatterns = [
    path('api/upload', uploadView.as_view(), name='file-upload'),
    path('api/files', fileListView.as_view(), name='file-list'),
    path('api/files/<int:id>', fileDownloadView.as_view(), name='file-download'),
    path('api/login', loginView.as_view(), name='login'),
    path('api/register', registerView.as_view(), name='register'),
    path('api/logout', logoutView.as_view(), name='logout'),
    path('api/auth-check', authCheckView.as_view(), name='auth-check'),
    path('api/test', testView.as_view(), name='test'),
]