from rest_framework.routers import DefaultRouter
from .views import EmployeeViewset
from django.urls import path, include

router = DefaultRouter()
router.register(r'employees', EmployeeViewset, basename='employee')

urlpatterns = [
    path('', include(router.urls))
]

