import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Idoso, IdosoForm } from '../models/idoso.model';

@Injectable({ providedIn: 'root' })
export class IdososService {
  private baseUrl = `${environment.apiUrl}/idosos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Idoso[]> {
    return this.http.get<Idoso[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Idoso> {
    return this.http.get<Idoso>(`${this.baseUrl}/${id}`);
  }

  criar(dados: IdosoForm): Observable<Idoso> {
    return this.http.post<Idoso>(this.baseUrl, dados);
  }

  atualizar(id: number, dados: Partial<IdosoForm>): Observable<Idoso> {
    return this.http.put<Idoso>(`${this.baseUrl}/${id}`, dados);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
