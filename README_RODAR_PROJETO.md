# OptiSpace integrado: Front-end + Backend 

## 1. Rodar o backend

Abra um terminal na pasta principal e execute:

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend: `http://127.0.0.1:8000`

## 2. Rodar o frontend

Em outro terminal, na pasta principal do projeto:

```bash
npm install
npm run dev
```

Front-end: normalmente `http://localhost:5173`


## Rotas principais da API

- `POST /api/auth/cadastrar/` cria conta e retorna token.
- `POST /api/auth/login/` autentica e retorna token.
- `GET /api/auth/me/` retorna usuário logado.
- `POST /api/analises/` cria análise autenticada.
- `GET /api/analises/` lista análises do usuário logado.
- `GET /api/analises/{id}/pdf/` baixa PDF autenticado.

## Observação

Depois de rodar `python manage.py migrate`, o SQLite será criado automaticamente.



