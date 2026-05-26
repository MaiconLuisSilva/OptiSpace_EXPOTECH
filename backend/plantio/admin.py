from django.contrib import admin
from .models import AnalisePlantio

@admin.register(AnalisePlantio)
class AnalisePlantioAdmin(admin.ModelAdmin):
    list_display = ('id', 'cultura', 'solo', 'regiao', 'mes_plantio', 'criado_em')
    search_fields = ('cultura', 'solo', 'regiao')
    list_filter = ('cultura', 'solo', 'regiao')
