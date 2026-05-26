from io import BytesIO
from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from .models import AnalisePlantio
from .serializers import AnalisePlantioSerializer, CadastroSerializer, LoginSerializer, UsuarioSerializer


class QueryParamTokenAuthentication(TokenAuthentication):
    """Permite autenticar PDFs também por ?token=... quando o navegador abre uma URL direta."""
    def authenticate(self, request):
        auth_result = super().authenticate(request)
        if auth_result:
            return auth_result
        token = request.query_params.get('token')
        if token:
            return self.authenticate_credentials(token)
        return None

@api_view(['POST'])
@permission_classes([AllowAny])
def cadastrar_usuario(request):
    serializer = CadastroSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'user': UsuarioSerializer(user).data}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_usuario(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'user': UsuarioSerializer(user).data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_logado(request):
    return Response(UsuarioSerializer(request.user).data)

class AnalisePlantioViewSet(viewsets.ModelViewSet):
    serializer_class = AnalisePlantioSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [QueryParamTokenAuthentication]

    def get_queryset(self):
        return AnalisePlantio.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['get'])
    def resumo(self, request):
        queryset = self.get_queryset()
        total = queryset.count()
        ultima = queryset.first()
        aprovadas = queryset.filter(resultado__status='Aprovado').count()
        return Response({
            'total_analises': total,
            'aprovadas': aprovadas,
            'ultima_analise': AnalisePlantioSerializer(ultima).data if ultima else None,
        })

    @action(detail=True, methods=['get'])
    def pdf(self, request, pk=None):
        analise = self.get_object()
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        largura, altura = A4
        y = altura - 60
        p.setFont('Helvetica-Bold', 18)
        p.drawString(50, y, 'Relatório OptiSpace - Análise de Plantio')
        y -= 35
        p.setFont('Helvetica', 11)
        linhas = [
            f'Usuário: {analise.usuario.first_name or analise.usuario.username}',
            f'ID: {analise.id}',
            f'Cultura: {analise.cultura}',
            f'Solo: {analise.solo}',
            f'Região: {analise.regiao}',
            f'Mês de plantio: {analise.mes_plantio}',
            f'Área: {analise.area_hectares} hectares',
            f'Status: {analise.resultado.get("status")}',
            f'Índice de viabilidade: {analise.resultado.get("indice_viabilidade")}% ',
            f'Produtividade estimada: {analise.resultado.get("produtividade_estimativa")}',
            f'Produção total: {analise.resultado.get("producao_total")}',
            f'Risco climático: {analise.resultado.get("risco_climatico")}',
            f'Recomendação: {analise.resultado.get("recomendacao")}',
        ]
        for linha in linhas:
            p.drawString(50, y, linha[:105])
            y -= 22
        p.showPage()
        p.save()
        buffer.seek(0)
        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="relatorio-optispace-{analise.id}.pdf"'
        return response
