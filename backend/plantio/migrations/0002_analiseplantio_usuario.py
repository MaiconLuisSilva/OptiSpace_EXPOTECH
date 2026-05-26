from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('plantio', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='analiseplantio',
            name='usuario',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='analises_plantio', to=settings.AUTH_USER_MODEL),
        ),
    ]
