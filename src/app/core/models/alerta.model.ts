export type TipoAlerta =
  | 'queda'
  | 'frequencia_baixa'
  | 'frequencia_alta'
  | 'fora_da_area';

export type Severidade = 'baixa' | 'media' | 'alta';

export interface Alerta {
  id: number;
  idosoId: number;
  tipo: TipoAlerta;
  severidade: Severidade;
  dados: Record<string, any> | null;
  lido: boolean;
  timestamp?: string; // presente quando o alerta veio do socket em tempo real
  createdAt?: string; // presente quando o alerta veio da API (histórico)
}
