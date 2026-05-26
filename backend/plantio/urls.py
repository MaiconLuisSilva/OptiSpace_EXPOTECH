from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import AnalisePlantioViewSet, cadastrar_usuario, login_usuario, usuario_logado

router = DefaultRouter()
router.register('analises', AnalisePlantioViewSet, basename='analises')

urlpatterns = [
    path('auth/cadastrar/', cadastrar_usuario),
    path('auth/login/', login_usuario),
    path('auth/me/', usuario_logado),
    path('', include(router.urls)),
]
