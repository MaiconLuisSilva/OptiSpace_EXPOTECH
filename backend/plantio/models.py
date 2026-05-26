from django.conf import settings
from django.db import models

class AnalisePlantio(models.Model):
    CULTURAS = [('Soja','Soja'), ('Milho','Milho'), ('Feijão','Feijão'), ('Arroz','Arroz')]
    SOLOS = [('Argiloso','Argiloso'), ('Arenoso','Arenoso'), ('Misto','Misto'), ('Humoso','Humoso')]
    REGIOES = [('Norte','Norte'), ('Nordeste','Nordeste'), ('Centro-Oeste','Centro-Oeste'), ('Sudeste','Sudeste'), ('Sul','Sul')]

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='analises_plantio',
        null=True,
        blank=True,
    )
    cultura = models.CharField(max_length=30, choices=CULTURAS)
    solo = models.CharField(max_length=30, choices=SOLOS)
    regiao = models.CharField(max_length=30, choices=REGIOES)
    mes_plantio = models.CharField(max_length=20)
    condicao_climatica = models.CharField(max_length=40)
    area_hectares = models.DecimalField(max_digits=10, decimal_places=2)
    temperatura_media = models.DecimalField(max_digits=5, decimal_places=2)
    agua_disponivel = models.DecimalField(max_digits=5, decimal_places=2)
    incidencia_solar = models.DecimalField(max_digits=5, decimal_places=2)
    umidade_solo = models.DecimalField(max_digits=5, decimal_places=2)
    resultado = models.JSONField(default=dict)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-criado_em']

    def __str__(self):
        dono = self.usuario.username if self.usuario else 'sem usuario'
        return f'{self.cultura} - {self.regiao} - {dono} - {self.criado_em:%d/%m/%Y}'
