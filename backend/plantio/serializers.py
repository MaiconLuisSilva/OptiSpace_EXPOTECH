from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import AnalisePlantio
from .services import calcular_plantio

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email']

class CadastroSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, min_length=6, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'nome', 'username', 'email', 'password', 'password_confirm']

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'As senhas não conferem.'})
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'username': 'Este login já está em uso.'})
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({'email': 'Este e-mail já está em uso.'})
        return attrs

    def create(self, validated_data):
        nome = validated_data.pop('nome')
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password,
            first_name=nome,
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs['username'], password=attrs['password'])
        if not user:
            raise serializers.ValidationError('Login ou senha inválidos.')
        attrs['user'] = user
        return attrs

class AuthResponseSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UsuarioSerializer()

class AnalisePlantioSerializer(serializers.ModelSerializer):
    usuario_nome = serializers.CharField(source='usuario.first_name', read_only=True)

    class Meta:
        model = AnalisePlantio
        fields = '__all__'
        read_only_fields = ['id', 'usuario', 'usuario_nome', 'resultado', 'criado_em']

    def validate_area_hectares(self, value):
        if value <= 0:
            raise serializers.ValidationError('A área precisa ser maior que zero.')
        return value

    def validate(self, attrs):
        for campo in ['temperatura_media', 'agua_disponivel', 'incidencia_solar', 'umidade_solo']:
            valor = attrs.get(campo)
            if valor is None:
                continue
            if campo != 'temperatura_media' and not (0 <= valor <= 100):
                raise serializers.ValidationError({campo: 'Informe um valor entre 0 e 100.'})
        return attrs

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            validated_data['usuario'] = request.user
        validated_data['resultado'] = calcular_plantio(validated_data)
        return super().create(validated_data)
