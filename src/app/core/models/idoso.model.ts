import { Alerta } from './alerta.model';

export interface Idoso {
  id: number;
  nome: string;
  dataNascimento: string;
  idade: number;
  endereco: string;
  responsavelId: number;
  createdAt: string;
  alertas: Alerta[];
  telefone: string;
  observacoes?: string;
  status?: string;
  bateria?: number;
  sinal?: string;
  alertaAtivo?: boolean;
}

export interface IdosoForm {
  nome: string;
  dataNascimento: string;
  endereco?: string;
  responsavelId?: number;
}
