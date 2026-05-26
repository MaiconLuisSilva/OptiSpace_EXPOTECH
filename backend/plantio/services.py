from decimal import Decimal

POTENCIAL_PRODUTIVIDADE = {
    'Soja': 72,
    'Milho': 170,
    'Feijão': 38,
    'Arroz': 95,
}
SEMENTES_HA = {
    'Soja': 392000,
    'Milho': 65000,
    'Feijão': 240000,
    'Arroz': 300000,
}
MESES_IDEAIS = {
    'Soja': ['Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    'Milho': ['Agosto', 'Setembro', 'Outubro', 'Janeiro', 'Fevereiro'],
    'Feijão': ['Março', 'Abril', 'Agosto', 'Setembro'],
    'Arroz': ['Outubro', 'Novembro', 'Dezembro'],
}
SOLO_FATOR = {
    'Soja': {'Argiloso': 1.0, 'Misto': 0.95, 'Humoso': 0.92, 'Arenoso': 0.78},
    'Milho': {'Argiloso': 0.95, 'Misto': 1.0, 'Humoso': 0.96, 'Arenoso': 0.80},
    'Feijão': {'Argiloso': 0.92, 'Misto': 0.96, 'Humoso': 1.0, 'Arenoso': 0.76},
    'Arroz': {'Argiloso': 1.0, 'Misto': 0.90, 'Humoso': 0.88, 'Arenoso': 0.70},
}
REGIAO_FATOR = {'Norte': 0.88, 'Nordeste': 0.82, 'Centro-Oeste': 1.0, 'Sudeste': 0.95, 'Sul': 0.93}
CLIMA_FATOR = {'Sol forte': 0.86, 'Sol moderado': 1.0, 'Chuva frequente': 0.92, 'Clima seco': 0.72, 'Clima úmido': 0.94}


def faixa(valor, minimo, ideal_min, ideal_max, maximo):
    valor = float(valor)
    if ideal_min <= valor <= ideal_max:
        return 1.0
    if valor < ideal_min:
        return max(0.55, 1 - ((ideal_min - valor) / max(1, ideal_min - minimo)) * 0.35)
    return max(0.55, 1 - ((valor - ideal_max) / max(1, maximo - ideal_max)) * 0.35)


def calcular_plantio(dados):
    cultura = dados['cultura']
    area = float(dados['area_hectares'])
    solo = dados['solo']
    mes = dados['mes_plantio']

    fatores = {
        'solo': SOLO_FATOR[cultura].get(solo, 0.85),
        'regiao': REGIAO_FATOR.get(dados['regiao'], 0.9),
        'clima': CLIMA_FATOR.get(dados['condicao_climatica'], 0.9),
        'temperatura': faixa(dados['temperatura_media'], 10, 22, 30, 42),
        'hidrico': faixa(dados['agua_disponivel'], 0, 55, 85, 100),
        'insolacao': faixa(dados['incidencia_solar'], 0, 55, 80, 100),
        'umidade_solo': faixa(dados['umidade_solo'], 0, 50, 80, 100),
        'epoca': 1.0 if mes in MESES_IDEAIS.get(cultura, []) else 0.80,
    }
    indice = 1
    for fator in fatores.values():
        indice *= fator

    produtividade = round(POTENCIAL_PRODUTIVIDADE[cultura] * indice, 2)
    producao_total = round(produtividade * area, 2)
    sementes_ha = SEMENTES_HA[cultura]
    sementes_total = int(sementes_ha * area)
    mm_necessarios = round(max(0, 1000 - (float(dados['agua_disponivel']) * 8)), 2)
    litros_totais = round(mm_necessarios * area * 10000, 2)

    if indice >= 0.78:
        status, risco = 'Aprovado', 'baixo'
        recomendacao = 'Condições boas para o plantio. Acompanhe irrigação e pragas.'
    elif indice >= 0.55:
        status, risco = 'Atenção', 'médio'
        recomendacao = 'Plantio possível, mas recomenda-se corrigir os fatores com menor pontuação.'
    else:
        status, risco = 'Não recomendado', 'alto'
        recomendacao = 'Evite iniciar o plantio agora. Ajuste água, época, solo ou escolha outra cultura.'

    return {
        'status': status,
        'indice_viabilidade': round(indice * 100, 2),
        'produtividade_estimativa': produtividade,
        'producao_total': producao_total,
        'sementes_necessarias_ha': sementes_ha,
        'sementes_necessarias_total': sementes_total,
        'risco_climatico': risco,
        'necessidade_hidrica': {'mm_necessarios': mm_necessarios, 'litros_totais': litros_totais},
        'fatores': {k: round(v, 2) for k, v in fatores.items()},
        'recomendacao': recomendacao,
    }
