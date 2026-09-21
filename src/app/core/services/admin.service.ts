import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Estatisticas {
  totalIdosos: number;
  totalCuidadores: number;
  alertasNaoLidos: number;
  alertasHoje: number;
}

export interface AlertaRecente {
  id: number;
  tipo: string;
  severidade: string;
  createdAt: string;
  idoso: { nome: string };
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  obterEstatisticas(): Observable<Estatisticas> {
    return this.http.get<Estatisticas>(`${this.baseUrl}/estatisticas`);
  }

  alertasRecentes(limite = 20): Observable<AlertaRecente[]> {
    return this.http.get<AlertaRecente[]>(`${this.baseUrl}/alertas-recentes?limite=${limite}`);
  }
}
