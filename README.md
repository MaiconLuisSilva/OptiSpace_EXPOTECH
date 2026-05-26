# 🌱 Modelo Agrícola Multicultura Inteligente

Sistema desenvolvido em Python para simulação e análise de produtividade agrícola com base em fatores climáticos e ambientais.

O projeto estima condições ideais de plantio para diferentes culturas utilizando cálculos agronômicos e classificação inteligente de risco climático.

---

# 📌 Objetivo

O objetivo do projeto é auxiliar na análise de condições de plantio através de:

- estimativa de produtividade,
- cálculo de produção total,
- necessidade hídrica,
- quantidade de sementes necessárias,
- análise de fatores climáticos,
- classificação da condição do plantio.

---

# 🌾 Culturas Suportadas

O sistema atualmente trabalha com:

- 🌱 Soja
- 🌽 Milho
- 🫘 Feijão
- 🌾 Arroz

---

# ⚙️ Tecnologias Utilizadas

- Python 3.12
- Django
- SQLite

---

# 📊 Funcionalidades

✅ Estimativa de produtividade agrícola  
✅ Cálculo de produção total  
✅ Necessidade hídrica em litros  
✅ Quantidade ideal de sementes por hectare  
✅ Avaliação climática  
✅ Classificação automática do plantio  
✅ Sistema multicultura  
✅ Modelo baseado em fatores agronômicos  

---

# 🧠 Como o Sistema Funciona

Cada cultura possui parâmetros ideais cadastrados:

- produtividade base,
- temperatura ideal,
- quantidade ideal de água,
- época ideal de plantio.

O sistema recebe informações como:

- tipo de solo,
- temperatura média,
- chuva,
- irrigação,
- insolação,
- umidade do solo,
- umidade do ar,
- área plantada.

Com base nesses dados, o sistema calcula fatores de desempenho e estima a produtividade final.

---

# 📌 Classificação das Condições do Plantio

O sistema retorna uma nota de 1 a 5 para representar a qualidade das condições agrícolas.

| Nota | Condição |
|---|---|
| 1 | Ótimas |
| 2 | Favoráveis |
| 3 | Regulares |
| 4 | Desfavoráveis |
| 5 | Péssimas |

---


# ▶️ Como Executar

## 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/seurepositorio.git
```

---

## 2. Acesse a pasta do projeto

```bash
cd seurepositorio
```

---
## 3. Rodar o backend

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

## 4. Rodar o frontend

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

---

# 👨‍💻 Autores

Maicon Luis Silva
Bruno de Morais Nicolau
Henry Freitas dos Santos

---

# 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais.


