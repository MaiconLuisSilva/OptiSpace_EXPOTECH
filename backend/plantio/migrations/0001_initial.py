# Generated manually for OptiSpace
from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name='AnalisePlantio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cultura', models.CharField(choices=[('Soja', 'Soja'), ('Milho', 'Milho'), ('Feijão', 'Feijão'), ('Arroz', 'Arroz')], max_length=30)),
                ('solo', models.CharField(choices=[('Argiloso', 'Argiloso'), ('Arenoso', 'Arenoso'), ('Misto', 'Misto'), ('Humoso', 'Humoso')], max_length=30)),
                ('regiao', models.CharField(choices=[('Norte', 'Norte'), ('Nordeste', 'Nordeste'), ('Centro-Oeste', 'Centro-Oeste'), ('Sudeste', 'Sudeste'), ('Sul', 'Sul')], max_length=30)),
                ('mes_plantio', models.CharField(max_length=20)),
                ('condicao_climatica', models.CharField(max_length=40)),
                ('area_hectares', models.DecimalField(decimal_places=2, max_digits=10)),
                ('temperatura_media', models.DecimalField(decimal_places=2, max_digits=5)),
                ('agua_disponivel', models.DecimalField(decimal_places=2, max_digits=5)),
                ('incidencia_solar', models.DecimalField(decimal_places=2, max_digits=5)),
                ('umidade_solo', models.DecimalField(decimal_places=2, max_digits=5)),
                ('resultado', models.JSONField(default=dict)),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
            ],
            options={'ordering': ['-criado_em']},
        ),
    ]
