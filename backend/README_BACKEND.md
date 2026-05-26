# Backend OptiSpace - Django

## Como rodar

```bash
cd backend
python -m venv venv
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Se bloquear script no Windows, use antes:
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API em: `http://127.0.0.1:8000/api/`

## Rotas principais

- `GET /api/health/` testa se a API está online.
- `POST /api/analises/` cria uma análise de plantio.
- `GET /api/analises/` lista o histórico.
- `GET /api/analises/{id}/` busca uma análise.
- `GET /api/analises/{id}/pdf/` baixa relatório PDF.
- `GET /api/analises/resumo/` retorna resumo geral.
