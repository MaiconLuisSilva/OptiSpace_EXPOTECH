export const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

const TOKEN_KEY = "optispace_token";
const USER_KEY = "optispace_user";

export type Usuario = {
  id: number;
  username: string;
  first_name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: Usuario;
};

export type CadastroPayload = {
  nome: string;
  username: string;
  email: string;
  password: string;
  password_confirm: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type AnalisePayload = {
  cultura: string;
  solo: string;
  regiao: string;
  mes_plantio: string;
  condicao_climatica: string;
  area_hectares: number;
  temperatura_media: number;
  agua_disponivel: number;
  incidencia_solar: number;
  umidade_solo: number;
};

export type Analise = AnalisePayload & {
  id: number;
  usuario?: number;
  usuario_nome?: string;
  resultado: {
    status: string;
    indice_viabilidade: number;
    produtividade_estimativa: number;
    producao_total: number;
    sementes_necessarias_ha: number;
    sementes_necessarias_total: number;
    risco_climatico: string;
    necessidade_hidrica: { mm_necessarios: number; litros_totais: number };
    fatores: Record<string, number>;
    recomendacao: string;
  };
  criado_em: string;
};

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUsuarioLocal(): Usuario | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function salvarSessao(auth: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, auth.token);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function request<T>(path: string, options?: RequestInit, auth = true): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth && token) headers.Authorization = `Token ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...headers, ...(options?.headers ?? {}) },
  });

  if (!response.ok) {
    let mensagem = "Erro ao conectar com o backend";
    try {
      const data = await response.json();
      mensagem = typeof data === "string" ? data : JSON.stringify(data);
    } catch {
      mensagem = await response.text();
    }
    throw new Error(mensagem || "Erro ao conectar com o backend");
  }

  return response.json();
}

export function cadastrarUsuario(payload: CadastroPayload) {
  return request<AuthResponse>("/auth/cadastrar/", {
    method: "POST",
    body: JSON.stringify(payload),
  }, false);
}

export function loginUsuario(payload: LoginPayload) {
  return request<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  }, false);
}

export function buscarUsuarioLogado() {
  return request<Usuario>("/auth/me/");
}

export function criarAnalise(payload: AnalisePayload) {
  return request<Analise>("/analises/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function listarAnalises() {
  return request<Analise[]>("/analises/");
}

export function urlPdfAnalise(id: number) {
  const token = getToken();
  return `${API_URL}/analises/${id}/pdf/${token ? `?token=${token}` : ""}`;
}


export async function baixarPdfAnalise(id: number) {
  const token = getToken();
  const response = await fetch(`${API_URL}/analises/${id}/pdf/`, {
    headers: token ? { Authorization: `Token ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error("Não foi possível baixar o PDF.");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `relatorio-optispace-${id}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
